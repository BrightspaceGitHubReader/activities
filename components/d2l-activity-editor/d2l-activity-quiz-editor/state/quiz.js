import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';

configureMobx({ enforceActions: 'observed' });

export class Quiz {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
	}

	get dirty() {
		return !this._entity.equals(this._makeQuizData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new QuizEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.canEditName = entity.canEditName();
		this.canEditShuffle =  entity.canEditShuffle();
		this.isShuffleEnabled = entity.isShuffleEnabled();
		this.canEditHints = entity.canEditHints();
		this.hintsToolEnabled = entity.getHintsToolEnabled();
		this.password = entity.password();
		this.canEditPassword = entity.canEditPassword();
		this.canEditDisableRightClick = entity.canEditDisableRightClick();
		this.isDisableRightClickEnabled = entity.isDisableRightClickEnabled();
		this.canEditDisablePagerAndAlerts = entity.canEditDisablePagerAndAlerts();
		this.isDisablePagerAndAlertsEnabled = entity.isDisablePagerAndAlertsEnabled();
		this.isPreventMovingBackwardsEnabled = entity.isPreventMovingBackwardsEnabled();
		this.canEditPreventMovingBackwards = entity.canEditPreventMovingBackwards();
		this.canEditNotificationEmail = entity.canEditNotificationEmail();
		this.notificationEmail = entity.notificationEmail();
	}

	async save() {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.save(this._makeQuizData());

		await this._saving;
		this._saving = null;

		await this.fetch();
	}

	setDisablePagerAndAlertsTool(isEnabled) {
		this.isDisablePagerAndAlertsEnabled = isEnabled;
	}

	setDisableRightClick(value) {
		this.isDisableRightClickEnabled = value;
	}

	setHintsToolEnabled(isHintsEnabled) {
		this.hintsToolEnabled = isHintsEnabled;
	}

	setName(value) {
		this.name = value;
	}

	setNotificationEmail(value) {
		this.notificationEmail = value;
	}

	setPassword(value) {
		this.password = value;
	}

	setPreventMovingBackwards(value) {
		this.isPreventMovingBackwardsEnabled = value;
	}

	setShuffle(isEnabled) {
		this.isShuffleEnabled = isEnabled;
	}

	_makeQuizData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
					 The cancel workflow is making use of that to detect changes.
		*/
		const data = {
			name: this.name,
			allowHints: this.hintsToolEnabled,
			shuffle: this.isShuffleEnabled,
			password: this.password,
			disableRightClick: this.isDisableRightClickEnabled,
			disablePagerAndAlerts: this.isDisablePagerAndAlertsEnabled,
			preventMovingBackwards: this.isPreventMovingBackwardsEnabled,
			notificationEmail: this.notificationEmail
		};

		return data;
	}
}

decorate(Quiz, {
	// props
	name: observable,
	canEditName: observable,
	canEditShuffle: observable,
	canEditHints: observable,
	canEditDisableRightClick: observable,
	canEditPreventMovingBackwards: observable,
	canEditDisablePagerAndAlerts: observable,
	isShuffleEnabled: observable,
	hintsToolEnabled: observable,
	password: observable,
	canEditPassword: observable,
	isDisableRightClickEnabled: observable,
	isDisablePagerAndAlertsEnabled: observable,
	isPreventMovingBackwardsEnabled: observable,
	canEditNotificationEmail: observable,
	notificationEmail: observable,
	// actions
	load: action,
	setName: action,
	setShuffle: action,
	setHintsToolEnabled: action,
	setPassword: action,
	setDisableRightClick: action,
	setDisablePagerAndAlertsTool: action,
	setPreventMovingBackwards: action,
	setNotificationEmail: action,
	save: action,
});
