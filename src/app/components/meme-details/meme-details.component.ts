import { Component, OnInit } from '@angular/core';
import { GetMemesService } from '../../services/get-memes.service';
import { CreateMemeService } from 'src/app/services/create-meme.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IMeme } from 'src/app/meme-interface';

@Component({
  selector: 'app-meme-details',
  templateUrl: './meme-details.component.html',
  styleUrls: ['./meme-details.component.scss'],
})
export class MemeDetailsComponent implements OnInit {
  memeId = '';
  memeUrl = '';
  getMemesCallRunning = false;
  userCaptions = { first: '', second: '' };
  createdMemeUrl = '';
  errorMessage = '';

  constructor(
    private getMemesService: GetMemesService,
    private createMemeService: CreateMemeService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.memeId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    const state = this.location.getState() as {
      navigationId: string;
      memeUrl: string;
    };
    if (state.memeUrl) {
      this.memeUrl = state.memeUrl;
    } else {
      this.getRespMemeOutOfAll();
    }
  }

  getRespMemeOutOfAll() {
    this.getMemesCallRunning = true;
    this.getMemesService.getMemes().subscribe({
      next: (resp) => this.handleGetMemesSuccess(resp),
      error: () => {
        this.getMemesCallRunning = false;
      },
    });
  }

  handleGetMemesSuccess(resp: any) {
    let memes: IMeme[] = [];
    if (resp.success && resp.data?.memes) {
      memes = resp.data.memes;
    }
    if (memes.length > 0) {
      const foundMeme = memes.find((meme) => meme.id === this.memeId);
      this.memeUrl = foundMeme ? foundMeme.url : '';
    }
    this.getMemesCallRunning = false;
  }

  createMeme() {
    this.createMemeService.createMeme(this.memeId, this.userCaptions.first, this.userCaptions.second).subscribe({
      next: (resp) => this.handleCreateMemeSuccess(resp),
      error: (resp) => this.handleCreateMemeError(resp),
    });
  }

  handleCreateMemeSuccess(resp: any) {
    if (resp.success && resp.data?.url) {
      this.createdMemeUrl = resp.data.url;
    } else {
      this.errorMessage = resp["error_message"];
    }
  }

  handleCreateMemeError(resp: any) {
    this.errorMessage = resp["error_message"];
  }
}
