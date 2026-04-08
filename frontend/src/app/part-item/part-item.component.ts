import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Part } from '../models/part';

@Component({
  selector: 'app-part-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './part-item.component.html',
})
export class PartItemComponent {
  @Input() part!: Part;
  @Output() edit = new EventEmitter<Part>();
  @Output() remove = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.part);
  }

  onDelete(): void {
    if (this.part._id) {
      this.remove.emit(this.part._id);
    }
  }
}
