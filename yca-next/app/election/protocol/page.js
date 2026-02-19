'use client';

import Link from 'next/link';

const ELECTION_PROTOCOL = [
    {
        articleNumber: 28,
        title: 'ELECTION COMMITTEE',
        content: 'There shall be an Election Committee in Central, Regional (in the States other than Mizoram), District and Zonal level namely Central Election Committee, Regional Election Committee, District Election Committee and Zonal Election Committee consisting of one Chairman, one Vice-Chairman, one Secretary and two other members.'
    },
    {
        articleNumber: 29,
        title: 'POWERS AND FUNCTIONS OF THE ELECTION COMMITTEE',
        sections: [
            {
                number: '29(1)',
                content: 'The Central Election Committee is empowered to conduct Regional and District level Committees’ election, the District Election Committee is empowered to conduct Zonal Level election and the Zonal Election Committee is empowered to conduct Branch Committees’ election. However, the Central Advisory Board shall conduct the Election to the Central Executive Committee in consultation with the present Central Executive Committee. The Advisory Board shall appoint Returning Officer and other Polling Officials either from among the Advisors or any person having electioneering knowledge and experience.'
            },
            {
                number: '29(2)',
                content: 'It shall notify the date of election in consultation with the concern Executive Committee.'
            },
            {
                number: '29(3)',
                content: 'It may appoint any member/ members as Returning officers, Presiding officers and Polling officers to conduct an election or bye election at any level.'
            },
            {
                number: '29(4)',
                content: 'It shall prepare an electoral roll as per provision.'
            },
            {
                number: '29(5)',
                content: 'It shall be responsible for declaration of all election results with information to all concerned authorities.'
            },
            {
                number: '29(6)',
                content: 'The Returning Officer shall issue Election Certificate to all the elected members.'
            },
            {
                number: '29(7)',
                content: 'Nomination of all candidates shall be scrutinized on the time and date as notified by the Returning Officer keeping in view whether the candidate fulfill all the provision of these rule. Candidate would not be rejected on mere reasonable ground.'
            }
        ]
    },
    {
        articleNumber: 30,
        title: 'TENURE OF THE ELECTION COMMITTEE',
        content: 'The tenure of the Election Committees shall be three (3) years from the date of appointment.'
    },
    {
        articleNumber: 31,
        title: 'ELECTION PROCEDURE',
        sections: [
            {
                number: '31(1)',
                content: 'A committee member of own setup, shall first propose the nomination of a candidate that nomination be seconded by another member shall remain valid.'
            },
            {
                number: '31(2)',
                content: 'There shall be prescribed form of nominations paper as envisaged in ANNEXURE-III.'
            },
            {
                number: '31(3)',
                content: 'The nomination paper should be submitted before the Returning Officer at least 24 hours before the commencement of the scrutiny.'
            },
            {
                number: '31(4)',
                content: 'There shall be surety made by each candidate and shall be deposited to the Returning officer along with submission of nomination of his/her candidature. The amount of surety to be made by the candidate shall be decided or forfeited by the Central Executive Committee.'
            },
            {
                number: '31(5)',
                content: 'If voting is conducted by ballot, it should be in secret.'
            },
            {
                number: '31(6)',
                content: 'The General Election of any level executive committees may be conducted by raising hand or by secret ballot with not less than 30 days prior notice to all members of the particular committee.'
            },
            {
                number: '31(7)',
                content: 'A general election shall be conducted on or before the expiry of the tenure of an executive committee.'
            },
            {
                number: '31(8)',
                content: 'In all level elections, the President, the Vice-President (s), the General Secretary and the Treasurer only shall be elected. A candidate contesting for a particular post shall be barred from contesting for other posts. The remaining Office-Bearers and the Executive Members shall be selected from the electorates enrolled in the concern Electoral Roll by the five/four elected members and form the Executive Committee.'
            },
            {
                number: '31(9)',
                content: 'Midterm election or bye election shall be held when the executive committee is suspended or dissolve or vacancy has been occurred due to resignation or removal or disqualification or otherwise as the case may be for the term of the committee concerned.'
            },
            {
                number: '31(10)',
                content: 'If one-fourth (1/4) of the total number of member have fallen vacant due to resignation, removal or otherwise including one elected members, the Executive Committee may induct any member by nomination to fill up such posts and reconstitute the Executive Committee. However, if 2/3 of the members including 3 elected members resigned, the Executive Committee is automatically dissolved. Provided that the superior committee may verify the cause of such resignation and if it satisfies with the reason, the concern Election Committee may initiate for fresh election.'
            },
            {
                number: '31(12)',
                content: 'If the number of candidate to a particular post is one, then the Returning Officer shall forthwith declare those candidates elected uncontested.'
            },
            {
                number: '31(13)',
                content: 'In case of draw of vote, it shall be decided by lottery.'
            }
        ]
    },
    {
        articleNumber: 32,
        title: 'QUALIFICATION TO BE A CANDIDATE',
        sections: [
            {
                number: '32(2)',
                content: 'To be a candidate in the Central Executive Committee and Regional Committee one must attain 25 years of age. Similarly, 21 year and 18 years at the Zonal Executive Committee and Branch Executive Committee election respectively. However, a candidate for the elected posts in the Central Executive Committee must be a graduate. He/ she must be an illegible voter enrolled in the concerned electoral roll.'
            },
            {
                number: '32(3)',
                content: 'If the intending candidate is held from a lower level committee, he/she should produce the recommendation of the immediate subordinate Executive Committee in support of his/her candidature during submission of his/ her nomination paper.'
            }
        ]
    },
    {
        articleNumber: 33,
        title: 'OATH TAKING',
        content: 'All the new Office Bearers in each level shall be sworn in Office after oath taking ceremony ANNEXURE-IV. The outgoing Executive Committee shall handover the charge including properties and assets of the Association to the new Executive Committee in this ceremony.'
    },
    {
        articleNumber: 34,
        title: 'ELECTORAL ROLL',
        content: 'To conduct an election of all level Executive Committee, an electoral roll shall be prepared by the concern Election Committee showing; Serial No., Name, Father’s Name, Age, Sex as envisaged in sub-section 4 of section 29 in this constitution as envisaged in ANNEXURE-V.'
    },
    {
        articleNumber: 35,
        title: 'VOTERS',
        sections: [
            {
                label: 'Central Executive Committee Election',
                content: 'All members of the existing Central Executive Committee, the office bearers of Regional Headquarters, District and Zonal Executive Committee, the President, Vice President, General Secretary and Treasurer of the Branch Executive Committee and all Donor Members shall be the electors and contest the election to the Central Executive Committee.'
            },
            {
                label: 'Regional Headquarters Executive Committee Election',
                content: 'All members of the Regional Headquarters Executive Committee, the Office Bearers of District, Zonal Executive Committee, all Donor members and the President, Vice President, General Secretary and Treasurer of the Branch Executive Committee shall be the electors and contest the election to the Regional Headquarters Executive Committee.'
            },
            {
                label: 'District Executive Committee Election',
                content: 'All members of the District Executive Committee, all office bearers of Zonal Executive Committee, Donor members and the President, Vice-President, General Secretary and Treasurer of the Branch Executive Committee shall be the electors and contest the election to the Zonal Executive Committee.'
            },
            {
                label: 'Zonal Executive Committee Election',
                content: 'All members of the Zonal Executive Committee, all Donor members and the Office Bearers of the Branch Executive Committee shall be the electors and contest the election to the Zonal Executive Committee.'
            },
            {
                label: 'Branch Executive Committee Election',
                content: 'All members of the Branch Executive Committee, all primary members of the Branch, Donor members shall be the electors and contest the election to the Branch Executive Committee.'
            }
        ]
    }
];

export default function ElectionProtocolPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            {/* Header */}
            <div className="bg-primary pt-24 pb-40 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto relative z-10">
                    <nav className="flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-widest text-white/60">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <Link href="/election" className="hover:text-white transition-colors">Elections</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-accent">Protocol</span>
                    </nav>

                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6">
                        Election <br />
                        <span className="text-accent underline decoration-white decoration-4 underline-offset-8">Protocol</span>
                    </h1>
                    <p className="max-w-2xl text-xl font-medium text-white/80 leading-relaxed">
                        The official constitutional rules and procedures governing all democratic processes
                        within the Young Chakma Association.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                    <div className="absolute bottom-0 right-0 size-96 bg-accent rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 -mt-20 pb-32">
                <div className="max-w-4xl mx-auto space-y-16">
                    {ELECTION_PROTOCOL.map((art, idx) => (
                        <section
                            key={art.articleNumber}
                            className="bg-white dark:bg-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl border border-gray-100 dark:border-white/10 relative overflow-hidden group hover:border-accent/30 transition-all"
                        >
                            {/* Article Badge - Watermark style to prevent text overlap */}
                            <div className="absolute -bottom-10 -right-10 text-primary/5 dark:text-accent/5 font-black text-[12rem] md:text-[16rem] select-none pointer-events-none transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-1000">
                                {art.articleNumber}
                            </div>

                            <div className="relative z-10 space-y-8">
                                <div className="space-y-2">
                                    <span className="text-accent font-black uppercase tracking-[0.2em] text-xs">Article {art.articleNumber}</span>
                                    <h2 className="text-3xl font-black text-primary dark:text-white leading-tight">{art.title}</h2>
                                    <div className="h-1.5 w-20 bg-accent rounded-full"></div>
                                </div>

                                {art.content && (
                                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                                        {art.content}
                                    </p>
                                )}

                                {art.sections && (
                                    <div className="grid grid-cols-1 gap-8 mt-12">
                                        {art.sections.map((section, sIdx) => (
                                            <div key={sIdx} className="p-8 rounded-3xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 space-y-4 hover:shadow-lg transition-all">
                                                {section.number && (
                                                    <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        Section {section.number}
                                                    </span>
                                                )}
                                                {section.label && (
                                                    <h3 className="text-xl font-black text-primary dark:text-accent uppercase tracking-tight">
                                                        {section.label}
                                                    </h3>
                                                )}
                                                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                                    {section.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}

                    {/* Footer Call to Action */}
                    <div className="p-16 rounded-[4rem] bg-accent text-white text-center space-y-8 shadow-2xl relative overflow-hidden group mt-32">
                        <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                        <h3 className="text-4xl font-black relative z-10">Need Clarification?</h3>
                        <p className="text-xl font-medium opacity-90 max-w-2xl mx-auto relative z-10">
                            The constitutional interpretation of these rules is the responsibility of the
                            Central Advisory Board. For specific procedural questions, please contact the
                            Election Committee.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 relative z-10">
                            <Link href="/contact" className="px-12 py-5 bg-white text-accent font-black rounded-2xl hover:bg-primary hover:text-white transition-all shadow-xl hover:scale-105">
                                Contact Election Committee
                            </Link>
                            <Link href="/bylaw" className="px-12 py-5 bg-primary/20 hover:bg-primary/40 text-white font-black rounded-2xl transition-all border border-white/20">
                                Full Constitution
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
