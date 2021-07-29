import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cammon } from '../models/cammon';

@Injectable()
export abstract class CammonService<E extends Cammon>  {


  protected endPoint?: string;
  protected header:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(protected http: HttpClient) { }
  
  public list(): Observable<E[]>{
    return this.http.get<E[]>(this.endPoint+'/list');
  }
  
  public find(id: number): Observable<E>{
    return this.http.get<E>(this.endPoint+'/find/'+id);
  }

  public save(e:E): Observable<E>{
    return this.http.post<E>(this.endPoint+'/save',e, {headers: this.header})
  }
  public update(e:E): Observable<E>{
    return this.http.put<E>(this.endPoint+'/edit/'+e.id,e, {headers: this.header})
  }
  public delete(id:number): Observable<void>{
    return this.http.delete<void>(this.endPoint+'/delete/'+id)
  }
  public listP(page: string, size: string): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size',size);
    return this.http.get<any>(this.endPoint+'/listP', {params: params});
  }
}

