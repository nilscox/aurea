import { Note } from '@nilscox/music-tools';
import { Sampler } from 'tone';

import { PlayType } from '../domain/session.slice';

export class Piano {
  constructor(public readonly sampler: Sampler) {}

  play(notes: Note[], playType: PlayType) {
    this.sampler.releaseAll();

    if (playType === 'harmonic') {
      this.sampler.triggerAttackRelease(
        notes.map((note) => note.toString()),
        '2',
      );
    } else {
      for (const [index, note] of Object.entries(notes)) {
        const time = Number(index) / 7;

        this.sampler.triggerAttackRelease(note.toString(), `${3 - time}`, `+${time}`);
      }
    }
  }

  static async load() {
    const response = await fetch('https://api.github.com/repos/Tonejs/audio/contents/salamander');
    const files: Array<{ name: string }> = await response.json();

    const urls = files
      .filter((file) => file.name.endsWith('.mp3'))
      .reduce((obj, file) => ({ ...obj, [note(file.name)]: file.name }), {});

    const sampler = new Sampler({
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      urls,
      release: 1,
    });

    return new Piano(sampler);

    function note(name: string): string {
      return name.replace('s', '#').replace('.mp3', '');
    }
  }
}
