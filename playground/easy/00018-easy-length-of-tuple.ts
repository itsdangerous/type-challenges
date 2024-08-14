// /*
//   18 - Length of Tuple
//   -------
//   by sinoon (@sinoon) #쉬움 #tuple

//   ### 질문

//   배열(튜플)을 받아 길이를 반환하는 제네릭 `Length<T>`를 구현하세요.

//   예시:

//   ```ts
//   type tesla = ['tesla', 'model 3', 'model X', 'model Y']
//   type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

//   type teslaLength = Length<tesla>  // expected 4
//   type spaceXLength = Length<spaceX> // expected 5
//   ```

//   > GitHub에서 보기: https://tsch.js.org/18/ko
// */

// /* _____________ 여기에 코드 입력 _____________ */

// // 기본 제공 type
// // type Length<T> = any;

// // 1차 시도 - 실패
// // 실패 - 배열이 아닌 타입에 대해서도 T['length']를 사용할 수 있기 때문에 에러가 발생한다.
// //  type Length<T> = T['length'];

// // 2차 시도 - 실패
// // T가 배열인지 확인하고 배열이라면 length를 반환하도록 구현
// // 실패 - case에서는 제공된 배열을 tuple로 선언했다.
// // 그렇기 때문에, string[]는 읽기 전용 배열이 아니기 때문에, 읽기 전용 배열을 사용해야 한다.
// // type Length<T extends string[]> = T['length']

// // 3차 시도 - 성공
// // 읽기 전용 배열은 readonly string[]으로 선언할 수 있다.
// // 다른 방법은 as const를 사용하여 tuple로 선언할 수 있다.
// type Length<T extends readonly string[]> = T["length"];

// /* _____________ 테스트 케이스 _____________ */
// import type { Equal, Expect } from "@type-challenges/utils";

// const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
// const spaceX = [
//   "FALCON 9",
//   "FALCON HEAVY",
//   "DRAGON",
//   "STARSHIP",
//   "HUMAN SPACEFLIGHT",
// ] as const;

// // type cases = [
// //   Expect<Equal<Length<typeof tesla>, 4>>,
// //   Expect<Equal<Length<typeof spaceX>, 5>>,
// //   // @ts-expect-error
// //   Length<5>,
// //   // @ts-expect-error
// //   Length<"hello world">
// // ];

// // 이 문제의 핵심은 읽기 전용 배열과 고정된 길이의 배열에 대한 이해라고 생각한다.
// // 읽기 전용 배열을 선언하는 방법은 2가지가 있다.
// // 1. readonly string[]
// // 2. as const

// // 고정 배열 길이를 선언하는 방법도 다음과 같이 2가지가 있다.
// // 1. tuple
// // 2. as const

// // 다음과 같은 예제를 보자.
// // const test1: readonly string[] = ["tesla", "model 3", "model X", "model Y"]; // 읽기 전용 배열(가변 길이의 배열)
// // const test2 = ["model1", "model 3"] as const; // 읽기 전용(고정된 길이의 배열)

// type customTestCase = [
//   Expect<Equal<Length<typeof test1>, 4>>,
//   Expect<Equal<Length<typeof test2>, 2>>
// ];

// // test1은 에러가 발생한다.
// // readonly string[]은 분명 읽기 전용 배열이다.
// // 즉, 배열의 각 요소에 대해 재할당이 불가능하다. 또한, 읽기 전용이기 때문에 추가, 삭제가 불가능하여 배열의 길이가 변할 수 없다고 볼 수 있다.
// // test1.push('model S'); // 불가능
// // test1.pop(); // 불가능
// // 또한, as const와 같이 재할당 또한 불가능하다. 상수취급을 받기 때문이다.
// // test1 = ['model S']; // 에러 발생

// // 하지만 이러한 선언은 Typescript의 타입 시스템에서는 readonly string[] 타입의 길이를 고정된 값으로 간주하지 않고, 'number' 타입으로 간주한다. 이것은 배열의 길이가 변할 수 있음을 의미한다.
// // 분명히 읽기 전용 배열이지만, 배열의 길이가 고정되어 있지 않다는 것이다.

// // 따라서 고정된 길이의 배열을 선언하려면 tuple로 선언해야 하며, 위에서 설명한 것과 같이 javascript에서는 tuple로 선언하는 방식은 2가지가 있다.

// // // 1. tuple로 선언
// // let fixedLengthArray1: [string, string, string] = ['model1', 'model 3', 'model X'];
// const fixedLengthArray1: readonly string[] = [
//   "tesla",
//   "model 3",
//   "model X",
//   "model Y",
// ]; // 읽기 전용 배열(가변 길이의 배열)

// // 2. as const로 선언
// let fixedLengthArray2 = ["model1", "model 3", "model X"] as const;
// const fixedLengthArray1 = ["tesla", "model 3", "model X", "model Y"] as const; // 읽기 전용 배열(가변 길이의 배열)

// type test = ["model1", "model 3", "model X"];

// // 느낀 점은 as const에 대해서 더 조사를 해봐야겠다는 것입니다.

// type customTestCase2 = [
//   Expect<Equal<Length<typeof fixedLengthArray1>, 3>>,
//   Expect<Equal<Length<typeof fixedLengthArray2>, 3>>
// ];
// /* _____________ 다음 단계 _____________ */
// /*
//   > 정답 공유하기: https://tsch.js.org/18/answer/ko
//   > 정답 보기: https://tsch.js.org/18/solutions
//   > 다른 문제들: https://tsch.js.org/ko
// */
// //

type A<T> = T extends (...args: any[]) => infer R ? R : never;

type ex = (x: number, y: string) => boolean;
type ex2 = A<ex>;
