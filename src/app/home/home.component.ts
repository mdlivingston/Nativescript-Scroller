import { Component, OnInit } from "@angular/core";
import { isAndroid, View, isIOS } from "tns-core-modules/ui/page/page";
import { ScrollEventData, ScrollView } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { topmost } from "tns-core-modules/ui/frame/frame";
import { Page } from 'tns-core-modules/ui/page/page';
import { AnimationCurve } from "tns-core-modules/ui/enums/enums";
@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    moduleId: module.id
})
export class HomeComponent implements OnInit {
    android = false;
    init = true;

    constructor(private page: Page) {
        // Use the component constructor to inject providers.
        page.actionBarHidden = true;
    }

    ngOnInit() {
        if (isAndroid) {
            this.android = true;
        }
    }
    onScroll(event: ScrollEventData, scrollView: ScrollView, topView: View, headerView: View) {
        if (scrollView.verticalOffset < 70) {
            const offset = scrollView.verticalOffset / 2;
            if (headerView.opacity != 0) {
                headerView.animate({ opacity: 0, duration: 500, curve: AnimationCurve.easeIn });
            }

            if (isAndroid || this.init) {
                this.init = false;
                topView.translateY = Math.floor(offset);
            } else {
                topView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
            }
        } else {
            if (headerView.opacity == 0) {
                headerView.animate({ opacity: 1, duration: 500, curve: AnimationCurve.easeIn });
            }
        }
    }
}
