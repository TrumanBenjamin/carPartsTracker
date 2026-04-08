import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartService } from '../services/part.service';
import { Part } from '../models/part';
import { PartItemComponent } from '../part-item/part-item.component';
import { PartEditComponent } from '../part-edit/part-edit.component';

@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [CommonModule, PartItemComponent, PartEditComponent],
  templateUrl: './part-list.component.html',
})
export class PartListComponent implements OnInit {
  parts: Part[] = [];
  selectedPart: Part | null = null;

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts(): void {
    this.partService.getParts().subscribe({
      next: (data) => (this.parts = data),
      error: (error) => console.error('Error loading parts:', error),
    });
  }

  onSavePart(part: Part): void {
    if (part._id) {
      this.partService.updatePart(part._id, part).subscribe(() => {
        this.selectedPart = null;
        this.loadParts();
      });
    } else {
      this.partService.createPart(part).subscribe(() => this.loadParts());
    }
  }

  onEditPart(part: Part): void {
    this.selectedPart = part;
  }

  onDeletePart(id: string): void {
    this.partService.deletePart(id).subscribe(() => this.loadParts());
  }

  onCancelEdit(): void {
    this.selectedPart = null;
  }
}
