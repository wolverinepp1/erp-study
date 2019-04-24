import {
  Injectable,
  Inject
} from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import {
  User
} from '../domain';
import {
  Observable
} from 'rxjs';
import {
  Project
} from '../domain';
@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-type': 'application/json'
  });
  constructor(
    private http: Http,
    @Inject('BASE_URL') private baseUrl
  ) {}
  searchUsers(filter: string): Observable < User[] > {
    const url = `${this.baseUrl.baseUrl}/${this.domain}`;
    return this.http.get(url, {
        params: {
          'email_like': filter
        }
      })
      .map(res => res.json() as User[]);
  }
  getUsersByProject(projectId: string): Observable < User[] > {
    const url = `${this.baseUrl.baseUrl}/${this.domain}`;
    return this.http.get(url, {
        params: {
          'projectId': projectId
        }
      })
      .map(res => res.json() as User[]);
  }
  addProjectRef(user: User, projectId: string): Observable < User > {
    const url = `${this.baseUrl.baseUrl}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user);
    }
    return this.http.patch(url, {
        projectIds: [...projectIds, projectId]
      }, {
        headers: this.headers
      })
      .map(res => res.json() as User);
  }

  removeProjectRef(user: User, projectId: string): Observable < User > {
    const url = `${this.baseUrl.baseUrl}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return Observable.of(user);
    }
    const toUpdate = projectIds.filter(p => p != projectId);
    return this.http.patch(url, {
        projectIds: toUpdate
      }, {
        headers: this.headers
      })
      .map(res => res.json() as User);
  }

  batchUpDateProjectRef(project: Project): Observable < User[] > {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return Observable.from(memberIds).switchMap(id => {
      const url = `${this.baseUrl.baseUrl}/${this.domain}/${id}`;
      return this.http.get(url)
        .map(res => res.json() as User)
        .filter(user => user.projectIds.indexOf(projectId) === -1)
        .switchMap(u => this.addProjectRef(u, projectId))
        .reduce((arr, curr) => [...arr, curr], []);
    });
  }

  getPersion(id) { // 个人信息
    const url = `${this.baseUrl.baseUrl}/${this.domain}`;
    return this.http.get(url, {
        params: {
          'id': id
        }
      })
      .map(res => res.json());
  }

  addPersion(user): Observable < any > {
    const url = `${this.baseUrl.baseUrl}/${this.domain}`;
    const data = {};
    for (const item in user) {
      if (item != 'id') {
        data[item] = user[item];
      }
    }
    return this.http.post(url, JSON.stringify(data), {
        headers: this.headers
      })
      .map(res => res.ok);
  }
  setPersion(user) {
    const url = `${this.baseUrl.baseUrl}/${this.domain}/${user.id}`;
    const toUpdate = {
      email: user.email,
      password: user.password,
      name: user.name,
      surePassword: user.surePassword,
      avater: user.avater,
      dateOfBirth: user.dateOfBirth,
      identity: user.identity,
      address: user.address,
    };
    return this.http.patch(url, JSON.stringify(toUpdate), {
        headers: this.headers
      })
      .map(res => res.ok);
  }
}
