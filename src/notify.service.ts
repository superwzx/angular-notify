/**
 * Created by wang on 2017/5/12.
 */

import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class NotifyService implements OnInit {

    notifyElem;

    delay: number;

    transition: any;

    constructor() {
        this.notifyElem = document.querySelector('#angular-notify');
        if (!this.notifyElem) {
            this.notifyElem = document.createElement('section');
            this.notifyElem.id = 'angular-notify';
            document.body.appendChild(this.notifyElem);
        }

        this.delay = 3000;
    }

    success(message: string, wait: number): void {
        this.log(message, "success", wait);
    }

    warn(message: string, wait: number): void {
        this.log(message, "warn", wait);
    }

    error(message: string, wait: number): void {
        this.log(message, 'error', wait);
    }

    log(message: string, type?: string, wait?: number): void {
        let log = document.createElement('article');
        log.className = 'notify-log' + ((type) ? 'notify-log-' + type : '');
        log.innerHTML = message;
        this.notifyElem.appendChild(log);
        setTimeout( () => {
            log.className += ' notify-log-show';
        }, 50);
        this.close(log, wait || this.delay);

    }

    close(elem, wait: number): void {

        const transitionDone = e => {
            e.stopPropagation();
            elem.removeEventListener(this.transition.type, transitionDone);
            this.notifyElem.removeChild(elem);
        };

        const hideElement = elem  => {
            if (elem.parentNode === this.notifyElem) {
                if (this.transition.supported) {
                    elem.addEventListener(this.transition.type, transitionDone);
                    elem.className += " notify-log-hide";
                }
            }
        };

        elem.addEventListener('click', () => {
            hideElement(elem);
        });

        if (wait === 0) return;
        setTimeout( () => { hideElement(elem); }, wait);
    }

    ngOnInit() {
        const getTransitionEvent = function () {
            let t,
                type,
                supported   = false,
                el = document.createElement("fakeelement"),
                transitions = {
                    "WebkitTransition" : "webkitTransitionEnd",
                    "MozTransition": "transitionend",
                    "OTransition": "otransitionend",
                    "transition": "transitionend"
                };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    type = transitions[t];
                    supported = true;
                    break;
                }
            }

            return {
                type: type,
                supported : supported
            };
        };

        this.transition = getTransitionEvent();

    }

}