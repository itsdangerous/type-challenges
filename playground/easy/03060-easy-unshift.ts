/*
  3060 - Unshift
  -------
  by jiangshan (@jiangshanmeta) #쉬움 #array

  ### 질문

  `Array.unshift`의 타입 버전을 구현하세요.

  예시:

  ```typescript
  type Result = Unshift<[1, 2], 0> // [0, 1, 2]
  ```

*/



// type Unshift<T, U> = any

// try - 1: number[]로 제한해서 3번째 케이스를 통과하지 못한다.
type Unshift<T extends number[], U> = [U, ...T];

// try - 2: string과 number를 받을 수 있는 union 타입으로 제한한다. 성공
// type Unshift<T extends (string | number)[], U> = [U, ...T];






/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
  
]



////////////////////////// 추가 ////////////////////////

// Unshift 타입은, 배열의 0번째 인덱스에 넣고자 하는 요소를 추가시키는데,
// 그렇다면 Shift 연산도 같은 방식으로 하면 된다.
type Shift<T extends (string | number)[], U> = [...T, U];

type testCase1 = [
  Expect<Equal<Shift<[], 1>, [1]>>,
  Expect<Equal<Shift<[1, 2], 0>, [1, 2, 0]>>,
  Expect<Equal<Shift<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
  Expect<Equal<Shift<['1', 2, '3'], [1,2,3]>, ['1', 2, '3', [1,2,3]]>>,
]


// 첫번째, 마지막에 추가하는 것 말고도 중간에 넣는 type은 어떻게 선언할까?
// 다음과 같은 테스트 케이트를 통과하기 위해 Insert type을 만들어보자.
// T: target array
// I: index
// U: element
// A: temp array(for copy and recursive)
type Insert<T extends any[], I extends number, U, A extends any[] = []> =
  A['length'] extends I // a. A의 길이가 index와 같은지
    ? [...A, U, ...T] // (a)라면, A 배열 뒤에 U,와 T 배열을 append.
    : T extends [infer First, ...infer Rest] // b. (a)가 아니라면, T가 
      ? Insert<Rest, I, U, [...A, First]> // b라면, 
      : [...A, U];

// type 시스템은 컴파일 시간에타입을 계산하는 시스템이기 때문에, 값의 조작을 하는, 즉 특정 위치에 요소를 '삽입'하는 연산은 불가능함.
// typesciprt에서 타입 연산은 기본적으로 '복사'의 개념을 바탕으로 이루어지기 때문에 배열을 재구성하는 것이 유일한 방법.
// 따라서, 배열을 재구성하기 위해서는 원시 배열을 그대로 가져와서 새로운 배열을 구성해야함.

// 위의 코드를 해석하면 다음과 같은 의미를 가지며 수행한다.

type testCase2 = [
  Expect<Equal<Insert<[], 1, 1>, [1]>>,
  Expect<Equal<Insert<[1, 2,3,4], 2, 6>, [1, 2, 6, 3, 4]>>,
  Expect<Equal<Insert<['1', 2, '3'], 1, boolean>, ['1', boolean, 2, '3']>>,
  Expect<Equal<Insert<['1', 2, '3',string, number], 3, [1,2,3]>, ['1', 2, '3', [1,2,3], string, number]>>,
]

















// type Insert<T extends any[], I extends number, U, A extends any[] = []> =
//   I extends A['length'] // 인덱스가 현재 길이와 같으면 삽입
//     ? [...A, U, ...T]
//     : T extends [infer First, ...infer Rest] // 배열을 분해하여 처리
//       ? Insert<Rest, I, U, [...A, First]>
//       : I extends A['length'] // 배열이 끝났을 때 인덱스가 유효한지 확인
//         ? [...A, U]
//         : T; // 유효하지 않으면 원래 배열 반환