import { DropDownObj } from './ServicesBase';

export function createId(idLength: number): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < idLength; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export function convertBlobToBinary(blobUrl: string): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', blobUrl);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status === 200) {
        const binaryData = new Uint8Array(xhr.response);
        resolve(binaryData);
      } else {
        reject(
          new Error(
            `An error occurred while retrieving the blob: ${xhr.statusText}`
          )
        );
      }
    };
    xhr.onerror = () => {
      reject(
        new Error(
          `An error occurred while retrieving the blob: ${xhr.statusText}`
        )
      );
    };
    xhr.send();
  });
}
export function convertBlobToBase64(blobUrl: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', blobUrl);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject(new Error('An error occurred while reading the blob.'));
        };
        reader.readAsDataURL(xhr.response);
      } else {
        reject(
          new Error(
            `An error occurred while retrieving the blob: ${xhr.statusText}`
          )
        );
      }
    };
    xhr.onerror = () => {
      reject(
        new Error(
          `An error occurred while retrieving the blob: ${xhr.statusText}`
        )
      );
    };
    xhr.send();
  });
}

export function convertBinaryToBase64(binaryData: Uint8Array) {
  let base64Data = btoa(
    String.fromCharCode.apply(null, Array.from(binaryData))
  );
  return base64Data;
}

export async function getCurrency() {
  let currency: string = '';
  await fetch('/assets/currency.json')
    .then((res) => res.json())
    .then((json) => {
      currency = json.currency;
    });
  return currency;
}

export function changeEnumToArrOfObj(s: any) {
  let objKeys = Object.keys(s);
  let arr: DropDownObj[] = [];
  objKeys.forEach((k) => {
    arr.push({ name: s[k], _id: k });
  });
  return arr;
}

export function getDateWithoutTimeInsideObj(obj: any) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key];
      if (
        typeof value === 'string' &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
      ) {
        let datePart = value.split('T')[0];
        obj[key] = datePart;
      }
    }
  }
  return obj;
}

export function getTodayDateWithoutTime() {
  let todayDate = new Date();
  let todayDateString = todayDate.toISOString();
  let todayDateStringWithoutTime = todayDateString.slice(
    0,
    todayDateString.indexOf('T')
  );
  return todayDateStringWithoutTime;
}

export function convertKeysToBeReadable(obj: any): any {
  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = convertCamelCaseToReadable(key);
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}

export function convertCamelCaseToReadable(input: string): string {
  const words = input.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  for (let i = 1; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toLowerCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(' ');
}
