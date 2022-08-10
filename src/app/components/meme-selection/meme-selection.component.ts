import { Component, OnInit } from '@angular/core';
import { GetMemesService } from '../../services/get-memes.service';
import { IMeme } from '../../meme-interface';

@Component({
  selector: 'app-meme-selection',
  templateUrl: './meme-selection.component.html',
  styleUrls: ['./meme-selection.component.scss']
})
export class MemeSelectionComponent implements OnInit {
  title = 'meme-editor';
  memes: IMeme[] = [];
  getMemesCallRunning = false;

  constructor(private service: GetMemesService) {}

  ngOnInit() {
    this.getMemes();
  }

  getMemes() {
    this.getMemesCallRunning = true;
    this.service.getMemes().subscribe({
      next: (resp) => this.handleSuccess(resp),
      error: () => {this.getMemesCallRunning = false },
    });
  }

  handleSuccess(resp: any) {
    if (resp.success && resp.data?.memes) {
      this.memes = resp.data.memes;
    }
    this.getMemesCallRunning = false;
  }
}
