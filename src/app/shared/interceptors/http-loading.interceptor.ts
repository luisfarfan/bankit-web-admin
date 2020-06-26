import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { catchError, delay, finalize, map, retryWhen, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    constructor(private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingCtrl.getTop().then(hasLoading => {
            if (!hasLoading) {
                this.loadingCtrl.create({
                    spinner: 'circular',
                    translucent: true
                }).then(loading => loading.present())
            }
        })

        return next.handle(req).pipe(
            retryWhen(err => {
                let retries = 1;
                return err.pipe(
                    delay(100),
                    tap(() => {
                        this.showRetryToast(retries);
                    }),
                    map(error => {
                        retries++;
                        if (retries >= 3) {
                            throw error;
                        }
                        return error;
                    })
                )
            }),
            catchError(err => {
                this.presentFailedAlert(err.error['msg']);
                return EMPTY;
            }),
            finalize(() => {
                this.loadingCtrl.getTop().then((hasLoading) => {
                    if (hasLoading) {
                        this.loadingCtrl.dismiss();
                    }
                })
            })
        )
    }

    async showRetryToast(retryCount) {
        const toast = await this.toastCtrl.create({
            message: `Retry: ${retryCount}/3`,
            duration: 1000
        })
        toast.present();
    }

    async presentFailedAlert(msg) {
        const alert = await this.alertCtrl.create({
            header: 'Oops',
            message: msg,
            buttons: ['Ok']
        });
        alert.present();
    }
}
