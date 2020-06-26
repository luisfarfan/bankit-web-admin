import { FormlyFieldConfig } from "@ngx-formly/core";
import { DynamicCrud, DynamicField } from "../interfaces/dynamic.interface";

export class DynamicUtils {
    static jsonFormToFormlyField(form: DynamicCrud): FormlyFieldConfig[] {
        return form.fields.map(f => DynamicUtils.generateField(f));
    }

    static generateField(field: DynamicField): FormlyFieldConfig {
        const _generateField = (_field) => {
            return {
                fieldGroupClassName: _field.fields ? 'display-flex' : undefined,
                type: _field.type,
                key: _field.name,
                className: _field.fields ? undefined : 'flex-1',
                templateOptions: {
                    label: _field.label || _field.name,
                    required: _field.required,
                    placeholder: _field.label || _field.name
                },
                fieldGroup: _field.fields ? _field.fields.map(f => {
                    return {
                        ..._generateField(f)
                    }
                }) : undefined
            }
        }
        return _generateField(field);
    }

    static findField(form: DynamicCrud, key: string): DynamicField {
        const _findField = (fields: DynamicField[]): DynamicField => {
            let field: DynamicField;
            for (let f = 0; f <= fields.length; f++) {
                if (fields[f].keyName === key) {
                    field = fields[f];
                    break;
                }
                if (fields[f].fields) {
                    field = _findField(fields[f].fields);
                    if (field) {
                        break;
                    }
                }
            }
            return field;
        }
        return _findField(form.fields);
    }
}

export const objectToQuerystring = (object): string => {
    let queryParameter = '?';
    for (const k in object) {
        if (object[k]) {
            if (object[k] instanceof Array) {
                if (object[k].length) {
                    queryParameter += JSON.stringify(object[k]);
                }
            } else if (object[k] instanceof Object) {
                if (object[k]) {
                    queryParameter += JSON.stringify(object[k]);
                }
            } else {
                queryParameter += `${k}=${typeof object[k] === 'boolean' ? object[k] ? 1 : 0 : object[k]}&`;
            }
        }
    }
    return queryParameter.slice(0, queryParameter.length - 1);
};
