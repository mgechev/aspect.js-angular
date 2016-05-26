# Angular bindings for aspect.js

This library provides bindings to the Angular `ElementInjector` when used together with [aspect.js](https://github.com/mgechev/aspect.js).

# Demo

```typescript
import {Router, Injectable} from '@angular/router';
import {beforeMethod, Metadata} from 'aspect.js';
import {Wove} from 'aspect.js-angular';

class SampleAspect {
  @beforeMethod({
    classNamePattern: /^Bar$/,
    methodNamePattern: /baz$/
  })
  logger(meta: Metadata) {
    meta.woveMetadata.injector.get(Router).navigate(['Home']);
  }
}

@Wove()
@Injectable()
class class Bar {
  baz() {
    // method content
  }
}
```

# License

MIT
