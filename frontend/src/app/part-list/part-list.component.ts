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
  errorMessage = '';

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts(): void {
    this.partService.getParts().subscribe({
      next: (data) => {
        this.parts = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          'Cannot load parts right now. Check backend and MongoDB connection.';
      },
    });
  }

  onSavePart(part: Part): void {
    if (part._id) {
      this.partService.updatePart(part._id, part).subscribe({
        next: () => {
          this.selectedPart = null;
          this.loadParts();
        },
        error: (error) => (this.errorMessage = error?.error?.message || 'Update failed'),
      });
    } else {
      this.partService.createPart(part).subscribe({
        next: () => this.loadParts(),
        error: (error) => (this.errorMessage = error?.error?.message || 'Create failed'),
      });
    }
  }

  onEditPart(part: Part): void {
    this.selectedPart = part;
  }

  onDeletePart(id: string): void {
    this.partService.deletePart(id).subscribe({
      next: () => this.loadParts(),
      error: (error) => (this.errorMessage = error?.error?.message || 'Delete failed'),
    });
  }

  onCancelEdit(): void {
    this.selectedPart = null;
  }

  get totalPrice(): number {
    return this.parts.reduce((sum, part) => sum + Number(part.price || 0), 0);
  }
}

