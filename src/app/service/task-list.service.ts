import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs';
@Injectable()
export class TaskListService {
    private readonly domain = 'taskList';
    private headers = new Headers({
        'Content-type': 'application/json',
    });
    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl
    ) { }
    add(taskList: TaskList): Observable<TaskList> {
        taskList.id = null;
        const url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.post(url, JSON.stringify(taskList), { headers: this.headers })
            .map(res => res.json());
    }

    update(taskList: TaskList): Observable<TaskList> {
        const url = `${this.baseUrl.baseUrl}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name,
        };
        return this.http.patch(url, JSON.stringify(toUpdate), { headers: this.headers })
            .map(res => res.json());
    }

    delete(taskList: TaskList): Observable<TaskList> {
        const url = `${this.baseUrl.baseUrl}/taskLists/${taskList.id}`;
        return this.http.delete(url)
            .mapTo(taskList);
    }

    get(projectId: String) {
        const url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.get(url, { params: { 'projectId': projectId } })
            .map(res => res.json() as TaskList[]);
    }
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList> {
        const dragUrl = `${this.baseUrl.baseUrl}/${this.domain}/${src.id}`;
        const dropUrl = `${this.baseUrl.baseUrl}/${this.domain}/${target.id}`;
        const drag$ = this.http.patch(dragUrl, JSON.stringify({ order: target.order }), { headers: this.headers }).map(res => res.json());
        const drop$ = this.http.patch(dropUrl, JSON.stringify({ order: src.order }), { headers: this.headers }).map(res => res.json());
        return Observable.concat(drag$, drop$)
        .reduce((x, y) => [...x, y], []);
    }
}
