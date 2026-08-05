---
heading: "The data comes across - and proves it"
---

The code is only half a migration; the other half is years of accumulated records, and legacy data is never as clean as everyone remembers. Free-text fields holding three different date formats, orphaned rows pointing at customers deleted in 2014, the "temporary" column that became load-bearing - every long-lived system has them, and discovering them mid-cutover is how migrations make the news internally.

So data gets migration engineering of its own: **mapping** old structures to new ones with the ambiguities resolved on paper first, **cleansing rules** that are written down and repeatable rather than one-off manual fixes, and above all **reconciliation** - record counts, totals and spot-comparisons run between old and new until the two systems agree, with every mismatch named and explained. While old and new run side by side, the comparison keeps running, which is how "nothing was lost" stops being a reassurance and becomes a report. When we rebuilt a laboratory's 600-form system, understanding and carrying its accumulated data was a project stage in its own right - skipping that stage is how migrations fail, so it is priced and planned from the start, never discovered.
