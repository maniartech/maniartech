import { v4 as uuidv4 } from 'uuid';


export const helloUUID = () => {
  console.log('Hello - ' + uuidv4());
};

export const hello = () => {
  console.log("Hello")
  10 / 0;
}
