"use client"

import { Layout } from "@/src/assets/pages"
import { ArticleTitle } from "@/src/assets/components"

export default function FrontierDiscourse() {
    return (
        <Layout>
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <ArticleTitle title="Frontier Discourse" width={50} class_="text-center mb-5" />

                        <div className="text-center py-5">
                            <div className="mb-4">
                                <h2 className="fw-bold text-primary mb-3">Annual Public Lecture Series and Awards</h2>
                                <div className="border-top border-bottom border-primary py-4 my-4">
                                    <p className="lead text-muted mb-4">
                                        The Frontier Discourse is Pacesetter Frontier Magazine's flagship intellectual platform,
                                        bringing together thought leaders, policymakers, academics, and industry experts to engage
                                        in meaningful conversations that shape our society.
                                    </p>
                                    <p className="text-muted mb-4">
                                        Our Annual Public Lecture Series features distinguished speakers who address critical issues
                                        affecting Nigeria and Africa, fostering dialogue on governance, economy, technology, culture,
                                        and development.
                                    </p>
                                    <p className="text-muted mb-0">
                                        The Frontier Discourse Awards recognize and celebrate individuals and organizations making
                                        exceptional contributions to national development, innovation, and social progress.
                                    </p>
                                </div>
                            </div>

                            <div className="alert alert-info mt-5" role="alert">
                                <h5 className="alert-heading">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Coming Soon
                                </h5>
                                <p className="mb-0">
                                    Details about our upcoming lecture series and awards ceremony will be announced soon.
                                    Stay connected with us for updates.
                                </p>
                            </div>

                            <div className="mt-5">
                                <a href="/about-us" className="btn btn-primary btn-lg me-3">
                                    Learn More About Us
                                </a>
                                <a href="/" className="btn btn-outline-secondary btn-lg">
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
