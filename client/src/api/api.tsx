import axios from "axios";  
export interface Book {  
  id: string;  
  shelf: 'wantToRead' | 'currentlyReading' | 'read';  // Changed this to a string for easier handling  
  title: string;  
  subtitle?: string;  
  authors?: string[];  
  publisher?: string;  
  publishedDate?: string;  
  description?: string;  
  industryIdentifiers?: IndustryIdentifier[];  
  pageCount?: number;  
  printedPageCount?: number;  
  printType?: string;  
  categories?: string[];  
  maturityRating?: string;  
  allowAnonLogging?: boolean;  
  contentVersion?: string;  
  imageLinks?: ImageLinks;  
  language?: string;  
  previewLink?: string;  
  infoLink?: string;  
  canonicalVolumeLink?: string;  
  dimensions?: Dimensions;  
}  

export interface IndustryIdentifier {  
  type: string;  
  identifier: string;  
}  

export interface ImageLinks {  
  smallThumbnail?: string;  
  thumbnail?: string;  
}  

export interface Dimensions {  
  height: string;  
  width: string;  
  thickness: string;  
}  
export interface User {  
  id: string;  
  username: string;  
  password: string;  
}  

export interface Shelf {  
  wantToRead: Book[];  
  currentlyReading: Book[];  
  read: Book[];  
}
export interface User {  
    id: string;  
    username: string;  
    password: string;
  }
class ApiService {  
  static baseURL = "http://localhost:3000/api"; // Adjust the base URL as necessary  

  static async validateCredentials(username: string, password: string): Promise<{ isValid: boolean; token?: string }> {  
    try {  
      const response = await axios.post<{ token: string }>(  
        `${this.baseURL}/signin`,  // Ensure this matches your actual API endpoint  
        { username, password }  
      );  
      return { isValid: true, token: response.data.token };  // Correctly map the response to the expected format  
    } catch (error) {  
      console.error("Error validating credentials:", error);  
      return { isValid: false };  
    }  
  }  

  static async getUserByToken(token: string): Promise<User> {  
    try {  
      const response = await axios.get<User>(  
        `${this.baseURL}/auth`,  // Suppose you have an endpoint to fetch user details  
        {  
          headers: { Authorization: `Bearer ${token}` }  
        }  
      );  
      return response.data;  
    } catch (error) {  
      console.error("Error fetching user:", error);  
      throw error;  
    }  
  }  
}  

export default ApiService;