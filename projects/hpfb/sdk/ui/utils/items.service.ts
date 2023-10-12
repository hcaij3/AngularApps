import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ItemsService {

    constructor() { }


    removeItemFromArray<T>(array: Array<T>, item: any) {
        _.remove(array, function (current) {
            //console.log(current);
            return JSON.stringify(current) === JSON.stringify(item);
        });
    }

    removeItems<T>(array: Array<T>, predicate: Predicate<T>) {
        _.remove(array, predicate);
    }

    setItem<T>(array: Array<T>, predicate: Predicate<T>, item: T) {
        var _oldItem = _.find(array, predicate);
        if(_oldItem){
            var index = _.indexOf(array, _oldItem);
            array.splice(index, 1, item);
        } else {
            array.push(item);
        }
    }


    addItemToStart<T>(array: Array<T>, item: any) {
        array.splice(0, 0, item);
    }


    getPropertyValues<T, R>(array: Array<T>, property : string) : R
    {
        var result = _.map(array, property);
        return <R><any>result;
    }

    getSerialized<T>(arg: any): T {
        return <T>JSON.parse(JSON.stringify(arg));
    }
}



export interface Predicate<T> {
    (item: T): boolean
}