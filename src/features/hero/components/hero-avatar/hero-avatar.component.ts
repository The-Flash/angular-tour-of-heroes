import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from 'src/features/shared/@types';
import { IAvatarGenerateService } from 'src/features/shared/services/avatar-generator.service';

@Component({
  selector: 'app-hero-avatar',
  templateUrl: './hero-avatar.component.html',
  styleUrls: ['./hero-avatar.component.scss']
})
export class HeroAvatarComponent implements OnInit {
  @Input() hero?: Hero;
  @Output() deleteHero = new EventEmitter<Hero>();
  @Output() selectHero = new EventEmitter<Hero>();

  avatarUri?: string;

  constructor(public avatarGeneratorService: IAvatarGenerateService) { }

  ngOnInit(): void {
    this.generateAvatar();
  }

  generateAvatar() {
    this.avatarGeneratorService
      .generate()
      .subscribe(avatar => {
        this.avatarUri = avatar;
      });
  }

  emitDeleteHero() {
    this.deleteHero.emit(this.hero);
  }

  emitSelectHero() {
    this.selectHero.emit(this.hero);
  }
}
