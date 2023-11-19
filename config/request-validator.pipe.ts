import { BadRequestException, PipeTransform } from '@nestjs/common';

export class AtLeastOneFieldPipe implements PipeTransform {
  transform(value: unknown) {
    const providedFields = Object.values(value).filter(
      (v) => v !== undefined && v !== null,
    );
    if (providedFields.length === 0) {
      throw new BadRequestException(
        'At least one field must be provided for update.',
      );
    }
    return value;
  }
}
