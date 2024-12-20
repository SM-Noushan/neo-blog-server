import { Query } from 'mongoose';
import status from 'http-status';
import AppError from '../errors/AppError';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const { search } = this.query;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field: string) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }
  sort() {
    const { sortBy } = this.query;
    const { sortOrder } = this.query;
    if (sortBy && (sortOrder || sortOrder === undefined)) {
      if (
        sortOrder !== 'asc' &&
        sortOrder !== 'desc' &&
        sortOrder !== undefined
      )
        throw new AppError(
          status.BAD_REQUEST,
          '!Invalid sortOrder: It should be either asc or desc',
        );
      const sort: string =
        sortOrder === 'desc' ? `-${sortBy}` : (sortBy as string);
      this.modelQuery = this.modelQuery.sort(sort);
    }

    return this;
  }
  filter() {
    const author = this.query.filter;
    if (author) this.modelQuery = this.modelQuery.find({ author });
    return this;
  }
}

export default QueryBuilder;
