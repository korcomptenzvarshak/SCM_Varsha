/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, Input, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { RecentClaimsModel } from '../interfaces/rec-claims.model';
//import { COUNTRIES } from './countries';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../components/dashboard/rec-claims/sortable.directive';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RecClaimsComponent } from '../components/dashboard/rec-claims/rec-claims.component';

interface SearchResult {
	recentClaimsList: RecentClaimsModel[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(countries: RecentClaimsModel[], column: SortColumn, direction: string): RecentClaimsModel[] {
	if (direction === '' || column === '') {
		return countries;
	} else {
		return [...countries].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(country: RecentClaimsModel, term: string, pipe: PipeTransform) {
	return (
		country.name.toLowerCase().includes(term.toLowerCase()) ||
		country.claimId.toLowerCase().includes(term.toLowerCase()) ||
		country.reason.toLowerCase().includes(term.toLowerCase()) ||
		country.customer.toLowerCase().includes(term.toLowerCase()) ||
		pipe.transform(country.amount).includes(term)||
		pipe.transform(country.days).includes(term)
	);
}

@Injectable({ providedIn: 'root' })
export class RecClaimsService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _recentClaims$ = new BehaviorSubject<RecentClaimsModel[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _state: State = {
		page: 1,
		pageSize: 5,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private pipe: DecimalPipe) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._recentClaims$.next(result.recentClaimsList);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get recentClaims$() {
		return this._recentClaims$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let recentClaims = sort(RecClaimsComponent.recentClaimsList, sortColumn, sortDirection);

		// 2. filter
		recentClaims = recentClaims.filter((recentClaim) => matches(recentClaim, searchTerm, this.pipe));
		const total = recentClaims.length;

		// 3. paginate
		recentClaims = recentClaims.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ recentClaimsList: recentClaims, total });
	}
}
