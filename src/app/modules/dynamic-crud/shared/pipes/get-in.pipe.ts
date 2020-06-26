import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";
import { DynamicCrud } from "../../interfaces/dynamic.interface";
import { DynamicUtils } from "../../utils/dynamic.utils";

const cacheData = {};

@Pipe({
    name: 'getIn'
})
export class GetInPipe implements PipeTransform {

    transform(value: any, form: DynamicCrud, keyName: string, title?: string): unknown {
        const field = cacheData[keyName] || DynamicUtils.findField(form, keyName);
        if (field) {
            cacheData['keyName'] = field;
        }
        return title ? field.name : _.get(value, field.access_value || field.keyName);
    }

}
