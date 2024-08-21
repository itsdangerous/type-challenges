/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #보통 #readonly #object-keys #deep

  ### 질문

  객체의 프로퍼티와 모든 하위 객체를 재귀적으로 읽기 전용으로 설정하는 제네릭 `DeepReadonly<T>`를 구현하세요.

  이 챌린지에서는 타입 파라미터 `T`를 객체 타입으로 제한하고 있습니다. 객체뿐만 아니라 배열, 함수, 클래스 등 가능한 다양한 형태의 타입 파라미터를 사용하도록 도전해 보세요.

  예시:

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > GitHub에서 보기: https://tsch.js.org/9/ko
*/

/* _____________ 여기에 코드 입력 _____________ */



// try 1 -
// 재귀로 들어가지 않고 depth가 1인 객체의 키만 readonly로 변환
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K];
// }

// tyr 2 -
// 재귀로 들어가지만 함수타입은 그대로 내보내야 함
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: DeepReadonly<T[K]>;
// };

// try 3- 성공
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Function ? T[K] : DeepReadonly<T[K]>;
};


// 이전에 재경 선생님이 알려주신 방식으로 시도해봄
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : DeepReadonly<T[K]>;
// };

// try 4 - Function 대신, 내장 유틸로만 구현
// type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

// type DeepReadonly<T> = {
//   readonly [K in keyof T]: IsFunction<T[K]> extends true ? T[K] : DeepReadonly<T[K]>;
// };


/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type cases = [
  Expect<Equal<DeepReadonly<X00>, Expected00>>,
  Expect<Equal<DeepReadonly<X0>, Expected0>>,
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X00 = {
   a:() => 22
   b: string
   c: {
     d: boolean
  }
}

type X0 = {
  a: () =>22
  b:string
}

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected00 = {
  readonly a:() => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
  }
}

type Expected0 = {
  readonly a: () => 22
  readonly b: string
}
type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

//////////////// 추가 //////////////////
//////////////// 추가 //////////////////
//////////////// 추가 //////////////////
//////////////// 추가 //////////////////
//////////////// 추가 //////////////////


// 참고 url
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

// keyof 타입 연산자
// keyof 연산자는 객체 타입에서 객체의 키 값들을 숫자나 문자열 리터럴 유니온을 생성한다.
// 아래의 타입 P는 "x" | "y"와 동일한 타입이다.

type Point = { 
  x: number;
  y:number;
}
type P = keyof Point;

// 만약 타입이 string이나 number 인덱스 시그니쳐를 가지고 있다면 keyof는 해당 타입을 리턴한다.
type AA = { [n: number]: unknown};
type A = keyof AA; // type A = number

type AA2 = { [n: string]: unknown};
type A2 = keyof AA2; // type 2 = string | number

// 여기서, string 시그니쳐를 가진다마면 string | number를 리턴하게되는데,
// 'javascript 객체 키는 항상 문자열을 강제' 하기 때문에, obj[0]은 obj["0"]과 동일하다.

const 예시1 = {
  a: '문자', // (property) a : string
  0: '숫자', // (property) 0 : string
  true: '부울', // (property) true: string
  99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 : ';',
}

// 만약 미리 선언되지 않은 속성유형 즉, 하드코딩으로 일일이 하나하나 시그니처를 부여하지 않는 방법으로는 index signature 방법을 사용할 수 있다.

type Horse ={
  ehihihing: string;
}

// 하드코딩
type OnlyBoolsAndHorses = {
  del: boolean,
  rodney: boolean,
  anyKey: {
    ehihihing: string,
  }
}

// index signature
// type OnlyBoolsAndHorses = {
//   [key: string]: boolean | Horse;
// }

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
  anyKey: { ehihihing: "some value" },
}

// 그렇다면 mapped types를 정의하기 위해서는?
// keyof는 객체 타입의 키들의 유니온 타입을 반환한다고 위에서 공부한 바 있다.
// keyof 키워드 앞에 'in'을 붙여주게 된다면, 이 유니온 타입을 순회한다.

// 예시를 보자
type Person = {
  name: string;
  age: number;
  isStudent: boolean;
}

type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
}

// type ReadonlyPerson = {
//   readonly name: string;
//   readonly age: number;
//   readonly isStudent: boolean;
// }

// 우리는 이전 학습을 통해, 타입을 제한하기 위해 extends 키워드를 공부했다.
// 그렇다면 in keyof와 extends는 무엇이 다른가 고민해보았다.

type ReadonlyPerson = {
  readonly [K extends Person]: Person[K];
} 

// 위 타입 선언은 에러가 난다.
// extends 키워드는 타입을 '제약'하는 것이기 때문이다.
// extends는 타입 제약을 나타내기 위해 사용되며, '제네릭 타입 매개변수'를 제한하거나 '조건부 타입'을 정의할 때 사용된다.
// 예시로, T extends U 는 'T'가 'U'의 서브타입이어야 한다는 의미다.

// in keyof는 mapped type을 정의할때 사용된다.
// keyof는 객체 타입의 모든 키들의 유니언 타입을 생성하며, in 키워드는 이 유니언 타입의 각 키를 순회하고, 이 키워드가 대괄호 안에 있다면 새로운 타입을 동적으로 생성할 수 있게 해준다.
// 예시로, [K in keyof T]는 타입 'T'의 모든 키를 순회하며 매핑된 타입을 '생성'한다.

///////여기서 주의해야할 점은 '제한'과 '생성'이다./////////