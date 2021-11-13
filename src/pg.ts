import { differenceWith, isEqual } from "lodash"

type P = {
  id: number
  name: string
}

const a: P[] = [
  {
    id: 1,
    name: "a",
  },
  {
    id: 2,
    name: "f",
  },
  {
    id: 3,
    name: "c",
  },
  {
    id: 4,
    name: "d",
  },
]

const db: P[] = [
  {
    id: 3,
    name: "c",
  },
  {
    id: 2,
    name: "b",
  },
  {
    id: 1,
    name: "a",
  },
  // {
  //   id: 4,
  //   name: "d",
  // },
]

console.log(differenceWith(a, db, isEqual))
