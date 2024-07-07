export interface DoctorData {
  id: number;
  attributes: {
    Name: string;
    Address: string;
    Patients: any; // Adjust type as per actual data type
    Year_of_Experience: string;
    StartTime: string;
    EndTime: string;
    About: string;
    Phone: string;
    Premium: boolean;
    email: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    categories: {
      data: Category[];
    };
    image: ImageApiResponse;
    appointments: {
      data: any[]; // Define proper type for appointments if known
    };
  };
}

export interface Category {
  id: number;
  attributes: CategoryAttributes;
}
export interface CategoryAttributes {
  Name: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  // Add more attributes as needed
}

export interface ImageData {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}


interface ImageFormats {
  thumbnail: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
  };
  // Add more formats as needed
}

interface ImageApiResponse {
  data: ImageData;
}

export interface DoctorApiResponse {
  data: DoctorData;
  meta: any; // Define type for meta if known
}