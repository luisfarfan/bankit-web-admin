import { DynamicCrud, FieldType } from "app/modules/dynamic-crud/interfaces/dynamic.interface";

export const UserForm: DynamicCrud = {
    name: 'user',
    endpoint: 'user/',
    fields: [
        {
            name: 'Nombre',
            keyName: 'first_name',
            type: FieldType.CHAR,
            required: true,
            access_value: 'first_name'
        },
        {
            name: 'Apellidos',
            keyName: 'last_name',
            type: FieldType.CHAR,
            required: true,
            access_value: 'last_name'
        },
        {
            name: 'Email',
            keyName: 'email',
            type: FieldType.CHAR,
            required: true,
            access_value: 'email'
        },
    ],
}
