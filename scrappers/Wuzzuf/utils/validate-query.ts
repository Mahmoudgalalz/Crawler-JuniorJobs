import { AreasFilter, CareerLevelsFilter, CitiesFilter, CountriesFilter, JobTypesFilter } from "./filters"

export interface IFilters {
  // country be enum of countryFilter and can be array
  country?: string[] | string
  city?: string[] | string
  area?: string[] | string
  career_level?: string
  job_types?: string
}

export interface IQuery {
  query: string
  options?: IFilters
}

export interface IQueryValidationError {
  param: string
  reason: string
}

export const validateQuery = (filters: IQuery): IQueryValidationError[] => {
  const errors: IQueryValidationError[] = [];

  // query must be string
  if (filters.query && typeof (filters.query) !== "string") {
    errors.push({
      param: "query",
      reason: `Must be a string`
    });
  }
  if (filters.options) {
    let {
      country,
      city,
      area,
      career_level,
      job_types,
    } = filters.options;
    // country must be string or array of strings
    if (country) {
      const allowed = Object.values(CountriesFilter)
      if (!Array.isArray(country))
        country = [country];
      if (!country.every(e => allowed.includes(e))) {
        errors.push({
          param: "options.country",
          reason: `Must be option of ${allowed.join(', ')}`
        });
      }
    }
    // city must be string or array of strings
    if (city) {
      const allowed = Object.values(CitiesFilter)
      if (!Array.isArray(city))
        city = [city];
      if (!city.every(e => allowed.includes(e))) {
        errors.push({
          param: "options.city",
          reason: `Must be option of ${allowed.join(', ')}`
        });
      }
    }
    // area must be string or array of strings
    if (area) {
      const allowed = Object.values(AreasFilter)
      if (!Array.isArray(area))
        area = [area];
      if (!area.every(e => allowed.includes(e))) {
        errors.push({
          param: "options.area",
          reason: `Must be option of ${allowed.join(', ')}`
        });
      }
    }
    // career_level must be string
    if (career_level) {
      const allowed = Object.values(CareerLevelsFilter)
      if (!allowed.includes(career_level)) {
        errors.push({
          param: "options.career_level",
          reason: `Must be option of ${allowed.join(', ')}`
        });
      }
    }
    // job_types must be string
    if (job_types) {
      const allowed = Object.values(JobTypesFilter)
      if (!allowed.includes(job_types)) {
        errors.push({
          param: "options.job_types",
          reason: `Must be option of ${allowed.join(', ')}`
        });
      }
    }
  }
  console.log(errors)
  return errors;
}