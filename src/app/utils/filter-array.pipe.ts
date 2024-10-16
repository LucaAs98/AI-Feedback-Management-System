import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe for filtering an array of objects based on a search term
 */
@Pipe({
  name: 'filterArray', // Name of the pipe to be used in templates
})
export class FilterArrayPipe implements PipeTransform {
  /**
   * Transforms the input array by filtering its elements based on the search term and field to filter by.
   *
   * @param array - The array of objects to be filtered
   * @param searchTerm - The term used for filtering the objects in the array
   * @param filterField - The field of the objects that will be checked against the search term
   * @returns A new array containing only the elements that match the search term
   */
  transform<T extends Record<string, any>>(
    array: T[],
    searchTerm: string,
    filterField: keyof T
  ): T[] {
    // If the array is not provided or the searchTerm is empty, return the original array
    if (!array || !searchTerm) return array;

    // Filter the array elements based on the specified field and search term
    return array.filter(
      (arrayElement) =>
        // Ensure the filter field exists, convert it to string and check if it includes the search term (case insensitive)
        arrayElement[filterField] &&
        arrayElement[filterField]
          .toString()
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim())
    );
  }
}
