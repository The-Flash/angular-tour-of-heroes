import { Injectable } from '@angular/core';
import { createAvatar } from "@dicebear/core";
import {
  lorelei,
  funEmoji,
  adventurer,
  adventurerNeutral,
  bigEars,
  bigSmile,
  botttsNeutral,
  bottts
} from "@dicebear/collection";
import { defer, Observable } from 'rxjs';


export abstract class IAvatarGenerateService {
  public abstract generate(): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarGeneratorService implements IAvatarGenerateService {

  generate(): Observable<string> {
    const style = this.pickAvatarStyle() as any;
    const avatar = createAvatar(style);
    const obs = defer(() => avatar.toDataUri());
    return obs;
  }

  private pickAvatarStyle() {
    const styles = [
      lorelei,
      funEmoji,
      adventurer,
      adventurerNeutral,
      bigEars,
      bigSmile,
      botttsNeutral,
      bottts
    ];
    const index = Math.floor(Math.random() * styles.length);
    return styles[index];
  }
}
