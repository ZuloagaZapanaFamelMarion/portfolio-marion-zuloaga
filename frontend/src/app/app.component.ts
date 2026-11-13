import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Project {
  title: string;
  description: string;
  repository: string;
  demo?: string;
  technologies: string[];
  accent: string;
  eyebrow: string;
}

interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
      ? '/api'
      : 'https://marion-zuloaga-portfolio-api.onrender.com/api';

  readonly currentYear = new Date().getFullYear();
  readonly menuOpen = signal(false);
  readonly sending = signal(false);
  readonly sent = signal(false);
  readonly sendError = signal(false);

  readonly projects: Project[] = [
    {
      title: 'Servicios financieros',
      eyebrow: 'API modular',
      description:
        'Backend para operaciones financieras organizado como monorepo, con validación de datos, persistencia y documentación de endpoints.',
      repository:
        'https://github.com/ZuloagaZapanaFamelMarion/Servicios-Financieros-con-NestJS-',
      technologies: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Swagger'],
      accent: 'cyan',
    },
    {
      title: 'Dashboard GHG',
      eyebrow: 'Visualización de datos',
      description:
        'Dashboard responsivo para explorar indicadores de emisiones mediante gráficos claros y una interfaz orientada a decisiones.',
      repository: 'https://github.com/ZuloagaZapanaFamelMarion/GHG-Dashboard-Design',
      demo: 'https://zuloagazapanafamelmarion.github.io/GHG-Dashboard-Design/',
      technologies: ['React', 'Tailwind CSS', 'Chart.js', 'Vite'],
      accent: 'green',
    },
    {
      title: 'My Orders',
      eyebrow: 'Gestión de pedidos',
      description:
        'Aplicación web para consultar y gestionar pedidos, con navegación por rutas, modales e integración de servicios mediante Axios.',
      repository: 'https://github.com/ZuloagaZapanaFamelMarion/My-Orders-app',
      technologies: ['React', 'JavaScript', 'React Router', 'Axios'],
      accent: 'violet',
    },
    {
      title: 'Dataverse',
      eyebrow: 'Experiencia interactiva',
      description:
        'Aplicación para filtrar, ordenar y visualizar información, acompañada de pruebas unitarias y end-to-end.',
      repository: 'https://github.com/ZuloagaZapanaFamelMarion/DEV014-Dataverse',
      demo: 'https://zuloagazapanafamelmarion.github.io/DEV014-Dataverse/',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Jest', 'Playwright'],
      accent: 'amber',
    },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      title: 'Frontend',
      description: 'Interfaces escalables, responsivas y orientadas a componentes.',
      skills: ['Angular', 'TypeScript', 'JavaScript', 'React', 'HTML5', 'CSS3'],
      icon: '01',
    },
    {
      title: 'Diseño UI',
      description: 'Sistemas visuales consistentes desde el diseño hasta producción.',
      skills: ['Tailwind CSS', 'Sass', 'Figma', 'Responsive Design'],
      icon: '02',
    },
    {
      title: 'Backend y datos',
      description: 'Servicios REST y persistencia para soluciones full stack.',
      skills: ['Node.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'Java'],
      icon: '03',
    },
    {
      title: 'Calidad y equipo',
      description: 'Flujos colaborativos y validación continua del producto.',
      skills: ['Git', 'GitHub', 'Jest', 'Playwright', 'Postman', 'Scrum'],
      icon: '04',
    },
  ];

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  submitContact(): void {
    if (this.contactForm.invalid || this.sending()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.sent.set(false);
    this.sendError.set(false);

    this.http
      .post(`${this.apiUrl}/contact`, this.contactForm.getRawValue())
      .subscribe({
      next: () => {
        this.sending.set(false);
        this.sent.set(true);
        this.contactForm.reset();
      },
      error: () => {
        this.sending.set(false);
        this.sendError.set(true);
      },
      });
  }
}
