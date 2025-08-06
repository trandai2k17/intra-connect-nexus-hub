import React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/library/CodeBlock';
import dentalClinic1 from '@/assets/dental-carousel-1.jpg';
import dentalPatient from '@/assets/dental-carousel-2.jpg';
import dentistPhoto from '@/assets/dentist-1.jpg';
import dentalServices from '@/assets/dental-services.jpg';

export default function CarouselLibrary() {
  const carouselExamples = [
    {
      title: "Basic Carousel",
      description: "Simple image carousel with navigation controls",
      html: `<!-- Basic Carousel -->
<div id="basicCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${dentalClinic1}" class="d-block w-100" alt="Modern Dental Clinic">
    </div>
    <div class="carousel-item">
      <img src="${dentalPatient}" class="d-block w-100" alt="Happy Patient">
    </div>
    <div class="carousel-item">
      <img src="${dentalServices}" class="d-block w-100" alt="Dental Services">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#basicCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#basicCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>`
    },
    {
      title: "Carousel with Captions",
      description: "Carousel with overlay text and CTA buttons",
      html: `<!-- Carousel with Captions -->
<div id="captionCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${dentalClinic1}" class="d-block w-100" alt="Modern Dental Clinic">
      <div class="carousel-caption d-none d-md-block">
        <h5>State-of-the-Art Dental Care</h5>
        <p>Experience modern dentistry with our advanced equipment and professional team.</p>
        <button class="btn btn-primary">Book Appointment</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${dentalPatient}" class="d-block w-100" alt="Happy Patient">
      <div class="carousel-caption d-none d-md-block">
        <h5>Comfortable Patient Experience</h5>
        <p>We prioritize your comfort and satisfaction throughout your dental journey.</p>
        <button class="btn btn-success">Learn More</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${dentalServices}" class="d-block w-100" alt="Dental Services">
      <div class="carousel-caption d-none d-md-block">
        <h5>Comprehensive Dental Services</h5>
        <p>From routine cleanings to advanced procedures, we've got you covered.</p>
        <button class="btn btn-warning">View Services</button>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#captionCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#captionCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>`
    },
    {
      title: "Carousel with Indicators",
      description: "Carousel with dot indicators at the bottom",
      html: `<!-- Carousel with Indicators -->
<div id="indicatorCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#indicatorCarousel" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#indicatorCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#indicatorCarousel" data-bs-slide-to="2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://via.placeholder.com/800x400/20c997/ffffff?text=Product+1" class="d-block w-100" alt="Product 1">
      <div class="carousel-caption">
        <h5>Featured Product 1</h5>
        <p>Amazing product with great features and benefits.</p>
        <button class="btn btn-outline-light">Shop Now</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://via.placeholder.com/800x400/17a2b8/ffffff?text=Product+2" class="d-block w-100" alt="Product 2">
      <div class="carousel-caption">
        <h5>Featured Product 2</h5>
        <p>High-quality product at an affordable price.</p>
        <button class="btn btn-outline-light">View Details</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://via.placeholder.com/800x400/6610f2/ffffff?text=Product+3" class="d-block w-100" alt="Product 3">
      <div class="carousel-caption">
        <h5>Featured Product 3</h5>
        <p>Latest innovation in our product line.</p>
        <button class="btn btn-outline-light">Pre-order</button>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#indicatorCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#indicatorCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>`
    },
    {
      title: "Fade Carousel",
      description: "Carousel with fade transition effect",
      html: `<!-- Fade Carousel -->
<div id="fadeCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://via.placeholder.com/800x400/495057/ffffff?text=Gallery+1" class="d-block w-100" alt="Gallery 1">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 p-3 rounded">
        <h5>Gallery Image 1</h5>
        <p>Beautiful landscape photography showcasing nature's beauty.</p>
        <button class="btn btn-info">View Gallery</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://via.placeholder.com/800x400/6c757d/ffffff?text=Gallery+2" class="d-block w-100" alt="Gallery 2">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 p-3 rounded">
        <h5>Gallery Image 2</h5>
        <p>Stunning architectural photography from around the world.</p>
        <button class="btn btn-info">Explore More</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://via.placeholder.com/800x400/adb5bd/ffffff?text=Gallery+3" class="d-block w-100" alt="Gallery 3">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 p-3 rounded">
        <h5>Gallery Image 3</h5>
        <p>Creative portrait photography capturing human emotions.</p>
        <button class="btn btn-info">Book Session</button>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#fadeCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#fadeCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>`
    },
    {
      title: "Card Carousel",
      description: "Multiple cards in carousel format",
      html: `<!-- Card Carousel -->
<div id="cardCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card">
            <img src="https://via.placeholder.com/300x200/007bff/ffffff?text=Service+1" class="card-img-top" alt="Service 1">
            <div class="card-body">
              <h5 class="card-title">Web Development</h5>
              <p class="card-text">Professional web development services using modern technologies.</p>
              <button class="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="https://via.placeholder.com/300x200/28a745/ffffff?text=Service+2" class="card-img-top" alt="Service 2">
            <div class="card-body">
              <h5 class="card-title">Mobile Apps</h5>
              <p class="card-text">Native and cross-platform mobile application development.</p>
              <button class="btn btn-success">Get Quote</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="https://via.placeholder.com/300x200/dc3545/ffffff?text=Service+3" class="card-img-top" alt="Service 3">
            <div class="card-body">
              <h5 class="card-title">UI/UX Design</h5>
              <p class="card-text">Beautiful and intuitive user interface and experience design.</p>
              <button class="btn btn-danger">View Portfolio</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card">
            <img src="https://via.placeholder.com/300x200/6f42c1/ffffff?text=Service+4" class="card-img-top" alt="Service 4">
            <div class="card-body">
              <h5 class="card-title">Digital Marketing</h5>
              <p class="card-text">Comprehensive digital marketing strategies for your business.</p>
              <button class="btn btn-outline-primary">Start Campaign</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="https://via.placeholder.com/300x200/fd7e14/ffffff?text=Service+5" class="card-img-top" alt="Service 5">
            <div class="card-body">
              <h5 class="card-title">SEO Optimization</h5>
              <p class="card-text">Improve your website's search engine ranking and visibility.</p>
              <button class="btn btn-outline-warning">Analyze Site</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="https://via.placeholder.com/300x200/e83e8c/ffffff?text=Service+6" class="card-img-top" alt="Service 6">
            <div class="card-body">
              <h5 class="card-title">Cloud Solutions</h5>
              <p class="card-text">Scalable cloud infrastructure and deployment solutions.</p>
              <button class="btn btn-outline-info">Migrate Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#cardCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#cardCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>`
    },
    {
      title: "Testimonial Carousel",
      description: "Customer testimonials in carousel format",
      html: `<!-- Testimonial Carousel -->
<div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="text-center p-5">
        <img src="${dentistPhoto}" class="rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover;" alt="Dr. Smith">
        <blockquote class="blockquote">
          <p class="mb-4">"Outstanding dental care with the latest technology. The staff is professional and caring."</p>
          <footer class="blockquote-footer">
            <cite title="Source Title">Maria Rodriguez, Satisfied Patient</cite>
          </footer>
        </blockquote>
        <div class="mt-3">
          <button class="btn btn-outline-primary me-2">Read Case Study</button>
          <button class="btn btn-primary">Contact Us</button>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="text-center p-5">
        <img src="https://via.placeholder.com/100x100/17a2b8/ffffff?text=👩" class="rounded-circle mb-3" alt="Customer">
        <blockquote class="blockquote">
          <p class="mb-4">"Professional, reliable, and innovative. They delivered exactly what we needed on time and within budget."</p>
          <footer class="blockquote-footer">
            <cite title="Source Title">Sarah Johnson, Marketing Director</cite>
          </footer>
        </blockquote>
        <div class="mt-3">
          <button class="btn btn-outline-success me-2">View Projects</button>
          <button class="btn btn-success">Get Started</button>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="text-center p-5">
        <img src="https://via.placeholder.com/100x100/6610f2/ffffff?text=👨" class="rounded-circle mb-3" alt="Customer">
        <blockquote class="blockquote">
          <p class="mb-4">"Amazing team with incredible expertise. They transformed our digital presence completely."</p>
          <footer class="blockquote-footer">
            <cite title="Source Title">Michael Davis, Founder</cite>
          </footer>
        </blockquote>
        <div class="mt-3">
          <button class="btn btn-outline-warning me-2">Learn More</button>
          <button class="btn btn-warning">Schedule Call</button>
        </div>
      </div>
    </div>
  </div>
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="2"></button>
  </div>
</div>`
    },
    {
      title: "Detailed Information Carousel",
      description: "Rich content carousel with comprehensive information, pricing, and multiple CTAs",
      html: `<!-- Detailed Information Carousel -->
<div id="detailedCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#detailedCarousel" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#detailedCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#detailedCarousel" data-bs-slide-to="2"></button>
  </div>
  
  <div class="carousel-inner">
    <!-- Slide 1: Dental Implants -->
    <div class="carousel-item active">
      <div class="row g-0 min-vh-50">
        <div class="col-md-6">
          <img src="${dentalServices}" class="img-fluid h-100 object-fit-cover" alt="Dental Implants">
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div class="p-5">
            <div class="badge bg-primary mb-3">Premium Service</div>
            <h2 class="mb-3">Dental Implants</h2>
            <h4 class="text-primary mb-3">Starting from $2,500</h4>
            <p class="lead mb-3">Restore your smile with our state-of-the-art dental implant procedures.</p>
            <ul class="list-unstyled mb-4">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Lifetime warranty</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Same day procedure available</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>99% success rate</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Free consultation</li>
            </ul>
            <div class="d-flex gap-3 flex-wrap">
              <button class="btn btn-primary btn-lg">Book Consultation</button>
              <button class="btn btn-outline-primary">View Gallery</button>
              <button class="btn btn-outline-secondary">Download Brochure</button>
            </div>
            <div class="mt-4">
              <small class="text-muted">
                <i class="bi bi-star-fill text-warning me-1"></i>
                4.9/5 rating from 250+ patients
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 2: Orthodontics -->
    <div class="carousel-item">
      <div class="row g-0 min-vh-50">
        <div class="col-md-6">
          <img src="${dentalClinic1}" class="img-fluid h-100 object-fit-cover" alt="Orthodontics">
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div class="p-5">
            <div class="badge bg-success mb-3">Most Popular</div>
            <h2 class="mb-3">Invisalign & Braces</h2>
            <h4 class="text-success mb-3">$3,200 - $6,800</h4>
            <p class="lead mb-3">Straighten your teeth with invisible aligners or traditional braces.</p>
            <ul class="list-unstyled mb-4">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Invisible treatment option</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>18-24 month average treatment</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Monthly progress monitoring</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Payment plans available</li>
            </ul>
            <div class="d-flex gap-3 flex-wrap">
              <button class="btn btn-success btn-lg">Start Treatment</button>
              <button class="btn btn-outline-success">Free Assessment</button>
              <button class="btn btn-outline-secondary">Before/After Photos</button>
            </div>
            <div class="mt-4">
              <small class="text-muted">
                <i class="bi bi-people-fill text-info me-1"></i>
                Over 1,000 successful treatments
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 3: Cosmetic Dentistry -->
    <div class="carousel-item">
      <div class="row g-0 min-vh-50">
        <div class="col-md-6">
          <img src="${dentalPatient}" class="img-fluid h-100 object-fit-cover" alt="Cosmetic Dentistry">
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div class="p-5">
            <div class="badge bg-warning mb-3">Transform Your Smile</div>
            <h2 class="mb-3">Cosmetic Dentistry</h2>
            <h4 class="text-warning mb-3">$500 - $1,800 per tooth</h4>
            <p class="lead mb-3">Enhance your smile with veneers, whitening, and cosmetic procedures.</p>
            <ul class="list-unstyled mb-4">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Porcelain veneers</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Professional whitening</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Smile makeover packages</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Digital smile preview</li>
            </ul>
            <div class="d-flex gap-3 flex-wrap">
              <button class="btn btn-warning btn-lg">Schedule Makeover</button>
              <button class="btn btn-outline-warning">Virtual Consultation</button>
              <button class="btn btn-outline-secondary">View Transformations</button>
            </div>
            <div class="mt-4">
              <small class="text-muted">
                <i class="bi bi-award-fill text-primary me-1"></i>
                Award-winning cosmetic dentist
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Controls -->
  <button class="carousel-control-prev" type="button" data-bs-target="#detailedCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#detailedCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<style>
.min-vh-50 { min-height: 50vh; }
.object-fit-cover { object-fit: cover; }
</style>`
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-background to-background/80">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6 space-y-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                  Bootstrap Carousel Library
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Collection of Bootstrap carousel templates with different styles, animations, and use cases
                </p>
              </div>

              <div className="grid gap-8">
                {carouselExamples.map((example, index) => (
                  <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{example.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {example.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg border">
                        <h4 className="font-semibold mb-3 text-foreground">Preview:</h4>
                        <div 
                          className="bg-white rounded border"
                          dangerouslySetInnerHTML={{ __html: example.html }}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">HTML Code:</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText(example.html)}
                          >
                            Copy Code
                          </Button>
                        </div>
                        <CodeBlock code={example.html} language="html" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">Bootstrap CSS & JS Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    To use these carousels, make sure to include Bootstrap CSS and JS:
                  </p>
                  <CodeBlock 
                    code={`<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>`}
                    language="html"
                  />
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}