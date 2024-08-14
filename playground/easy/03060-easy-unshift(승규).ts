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

// type 시스템은 컴파일 시간에타입을 계산하는 시스템이기 때문에, 값의 조작을 하는, 즉 특정 위치에 요소를 '삽입'하는 연산은 불가능함.
// typesciprt에서 타입 연산은 기본적으로 '복사'의 개념을 바탕으로 이루어지기 때문에 배열을 재구성하는 것이 유일한 방법.
// 따라서, 배열을 재구성하기 위해서는 원시 배열을 그대로 가져와서 새로운 배열을 구성해야함.
// 이를 위해서는 스프레드 연산자를 사용하여 복사해야함.

// try - 1: number[]로 제한해서 3번째 케이스를 통과하지 못한다.
// type Unshift<T extends number[], U> = [U, ...T];

// try - 2: string과 number를 받을 수 있는 union 타입으로 제한한다. 성공
type Unshift<T extends (string | number)[], U> = [U, ...T];


/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
  
]



////////////////////////// 추가 문제 ////////////////////////

// Unshift 타입은, 배열의 0번째 인덱스에 넣고자 하는 요소를 추가시키는데,
// Shift는 0번째 인덱스에 있는 요소를 제거한다.
type Shift<T extends any[]> = T extends[any, ...infer R] ? R: never;

type testCase2 = [
  Expect<Equal<Shift<[1, 2]>, [2]>>,
  Expect<Equal<Shift<['1', 2, '3']>, [2, '3']>>,
]

// 마지막 index에 추가하는 것은 다음과 같고,
type Append<T extends (string | number)[], U> = [...T, U];

type testCase3 = [
  Expect<Equal<Append<[], 1>, [1]>>,
  Expect<Equal<Append<[1, 2], 0>, [1, 2, 0]>>,
  Expect<Equal<Append<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
  Expect<Equal<Append<['1', 2, '3'], [1,2,3]>, ['1', 2, '3', [1,2,3]]>>,
]

// 마지막 index를 제거하는 것은 다음과 같다.
type Pop<T extends (string | number)[]> = T extends [...infer R, any] ? R : never;

type testCase4 = [
  Expect<Equal<Pop<[1, 2]>, [1]>>,
  Expect<Equal<Pop<['1', 2, '3']>, ['1', 2,]>>,
  Expect<Equal<Pop<['1', 2, '3', 5, 6]>, ['1', 2, '3', 5]>>,
]



// 첫번째, 마지막에 추가하는 것 말고도 중간에 넣는 type은 어떻게 선언할까?
// 다음과 같은 테스트 케이트를 통과하기 위해 Insert type을 만들어보자.
// T: target array
// I: index
// U: element
// A: temp array(for copy and recursive)
type Insert<T extends any[], I extends number, U, A extends any[] = []> =
  A['length'] extends I 
    ? [...A, U, ...T] 
    : T extends [infer First, ...infer Rest] 
      ? Insert<Rest, I, U, [...A, First]> 
      : [...A, U];



// 위의 코드를 해석하면 다음과 같은 의미를 가지며 수행한다.

type testCase6 = [
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