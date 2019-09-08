import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { isAndroid, View, isIOS } from "tns-core-modules/ui/page/page";
import { ScrollEventData, ScrollView } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { Page } from 'tns-core-modules/ui/page/page';
import { AnimationCurve } from "tns-core-modules/ui/enums/enums";
@Component({
    selector: 'ns-scroller',
    templateUrl: './scroller.component.html',
    styleUrls: ['./scroller.component.css']
})
export class ScrollerComponent implements OnInit {
    @Input('title') title: string;
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
        if (scrollView.verticalOffset < 40) {
            if (headerView.opacity != 0) {

                headerView.animate({ opacity: 0, duration: 20, curve: AnimationCurve.easeIn });
                topView.animate({ opacity: 1, duration: 20, curve: AnimationCurve.easeIn });
            }
        } else {
            if (headerView.opacity == 0) {
                topView.animate({ opacity: 0, duration: 20, curve: AnimationCurve.easeIn });
                headerView.animate({ opacity: 1, duration: 20, curve: AnimationCurve.easeIn });
            }
        }
    }

}
