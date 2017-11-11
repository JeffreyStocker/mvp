
// google api geolocation https://developers.google.com/maps/documentation/geocoding/intro
// https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
// outputFormat= json (ie json file format) or xml = xml (duh!?)
// parameter: 
// Required parameters in a geocoding request:

// address — The street address that you want to geocode, in the format used by the national postal service of the country concerned. Additional address elements such as business names and unit, suite or floor numbers should be avoided. Please refer to the FAQ for additional guidance. 
//      or 
// components — A components filter with elements separated by a pipe (|). The components filter is also accepted as an optional parameter if an address is provided. Each element in the components filter consists of a component:value pair, and fully restricts the results from the geocoder. See more information about component filtering below.
// key — Your application's API key. This key identifies your application for purposes of quota management. Learn how to get a key.
// Note: Google Maps APIs Premium Plan customers may use either an API key, or a valid client ID and digital signature, in your Geocoding requests. Get more information on authentication parameters for Premium Plan customers.
// Optional parameters in a geocoding request:

// bounds — The bounding box of the viewport within which to bias geocode results more prominently. This parameter will only influence, not fully restrict, results from the geocoder. (For more information see Viewport Biasing below.)
// language — The language in which to return results.
// See the list of supported languages. Google often updates the supported languages, so this list may not be exhaustive.
// If language is not supplied, the geocoder attempts to use the preferred language as specified in the Accept-Language header, or the native language of the domain from which the request is sent.
// The geocoder does its best to provide a street address that is readable for both the user and locals. To achieve that goal, it returns street addresses in the local language, transliterated to a script readable by the user if necessary, observing the preferred language. All other addresses are returned in the preferred language. Address components are all returned in the same language, which is chosen from the first component.
// If a name is not available in the preferred language, the geocoder uses the closest match.
// The preferred language has a small influence on the set of results that the API chooses to return, and the order in which they are returned. The geocoder interprets abbreviations differently depending on language, such as the abbreviations for street types, or synonyms that may be valid in one language but not in another. For example, utca and tér are synonyms for street in Hungarian.
// region — The region code, specified as a ccTLD ("top-level domain") two-character value. This parameter will only influence, not fully restrict, results from the geocoder. (For more information see Region Biasing below.)
// components — A components filter with elements separated by a pipe (|). The components filter is required if the request doesn't include an address. Each element in the components filter consists of a component:value pair, and fully restricts the results from the geocoder. See more information about component filtering below.

