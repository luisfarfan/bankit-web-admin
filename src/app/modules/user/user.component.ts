import { Component, OnInit } from '@angular/core';
import { UserForm } from "./user.form";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    userForm = UserForm;

    constructor() {
    }

    ngOnInit(): void {
    }

}
