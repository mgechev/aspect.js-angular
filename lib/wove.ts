import {ReflectiveInjector} from '@angular/core';

import {_AspectRegistry} from 'aspect.js';

export interface WoveMetadata {
  injector: ReflectiveInjector;
  config: any;
}

export const Wove = (config: any) => {
  return (target: Function) => {
    const result = function () {
      target.apply(this, arguments);
      const keys = Object.getOwnPropertyNames(_AspectRegistry);
      const woveMetadata: WoveMetadata = {
        injector: arguments[arguments.length - 1],
        config
      };
      keys.forEach(key => {
        _AspectRegistry[key].wove(target, woveMetadata);
      });
    };
    Reflect.getMetadataKeys(target)
      .forEach((key: string) => {
        Reflect.defineMetadata(key, Reflect.getMetadata(key, target), result);
      });
    const params = Reflect.getMetadata('design:paramtypes', target) || [];
    params.push(ReflectiveInjector);
    Reflect.defineMetadata('design:paramtypes', params, result);
    result.prototype = target.prototype;
    return result;
  };
};

