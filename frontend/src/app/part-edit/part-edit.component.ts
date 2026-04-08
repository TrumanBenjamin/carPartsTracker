import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Part } from '../models/part';

interface PartFormData {
  _id?: string;
  partName: string;
  brand: string;
  price: number | null;
  installed: boolean;
}

@Component({
  selector: 'app-part-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './part-edit.component.html',
})
export class PartEditComponent implements OnChanges {
  @Input() selectedPart: Part | null = null;
  @Output() save = new EventEmitter<Part>();
  @Output() cancel = new EventEmitter<void>();

  formData: PartFormData = this.getEmptyPart();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPart']) {
      this.formData = this.selectedPart
        ? { ...this.selectedPart }
        : this.getEmptyPart();
    }
  }

  onSubmit(): void {
    if (this.formData.price === null) {
      return;
    }

    this.save.emit({
      ...this.formData,
      price: Number(this.formData.price),
    });

    if (!this.selectedPart) {
      this.formData = this.getEmptyPart();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.formData = this.getEmptyPart();
  }

  private getEmptyPart(): PartFormData {
    return {
      partName: '',
      brand: '',
      price: null,
      installed: false,
    };
  }
}
