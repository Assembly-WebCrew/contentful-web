import { MarkdownDirective } from './markdown.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'asm-markdown-test',
  template: '<div asmMarkdown># Hello, world!</div>'
})
class MarkdownTestComponent {
}

describe('MarkdownDirective', () => {
  let component: MarkdownTestComponent;
  let fixture: ComponentFixture<MarkdownTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MarkdownTestComponent,
        MarkdownDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be converted to markdown', () => {
    expect(fixture.debugElement.nativeElement.innerHTML).toEqual('<div asmmarkdown=""><h2 id="helloworld">Hello, world!</h2></div>');
  });
});
