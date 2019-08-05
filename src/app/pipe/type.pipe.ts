import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'type'
})
export class TypePipe implements PipeTransform {
    transform(type: any): any {
        let value;
        switch(type){
            case "v-pop":
                value = "Nhạc Pop Việt Nam";
                break;
            case "k-pop":
                value = "Nhạc Pop Hàn Quốc";
                break;
            case "us-pop":
                value = "Nhạc Pop Âu Mỹ";
                break;
            case "v-dance":
                value = "Nhạc Pop Việt Nam";
                break;
            case "k-dance":
                value = "Nhạc Pop Hàn Quốc";
                break;
            case "us-dance":
                value = "Nhạc Pop Âu Mỹ";
                break;
            case "v-edm":
                value = "Nhạc Pop Việt Nam";
                break;
            case "k-edm":
                value = "Nhạc Pop Hàn Quốc";
                break;
            case "us-edm":
                value = "Nhạc Pop Âu Mỹ";
                break;
        }
        return value;
    }
}