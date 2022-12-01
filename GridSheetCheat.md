# Grid container on parent

[Mdn Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

- Explicite grid : grid with **grid-template-column** and **grid-template-row** explicitly set
- Implicite grid : Either **grid-template-column** or **grid-template-row** was explicitly set

- Grid Track : this represents space between any two lines on the grid

# grid-template-columns on parent

## tracks Units

- fr (frame) represents the fraction of the available space -- (flexible unit)

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

- % (percentages) -- (flexible unit)

```css
.wrapper {
  display: grid;
  grid-template-columns: 50% 1fr 1fr;
}
```

- px (pixels) -- (fixed unit)

```css
.wrapper {
  display: grid;
  grid-template-columns: 500px 1fr 1fr;
}
```

## supported css functions

### repeat() repeat the template with a given parameters

---

[repeat](<https://developer.mozilla.org/en-US/docs/Web/CSS/repeat()>)

---

- Syntax: repeat( [ <positive-integer> | auto-fill | auto-fit ] , <track-list> )

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

is equivalent to

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

it could be mixed with other track listing

_below, we should obtain 8 tracks_

```css
.wrapper {
  display: grid;
  grid-template-columns: 20px repeat(6, 1fr) 20px;
}
```

## implicite grid row

_examples_

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
}
```

with minmax

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
```

# Gutters or column-gap row-gap on parent

Gutters or alleys between grid cells can be created using the column-gap and row-gap properties, or the **shorthand gap**. In the below example, I am creating a 10-pixel gap between columns and a 1em gap between rows.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 1em;
}
```

# tracks alignment on parent

## justify-content (tracks) on parent alignment on the inline axis

[Justify content](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout#justifying_the_grid_tracks_on_the_inline_axis)
[Justify content tailwindcss](https://tailwindcss.com/docs/justify-content)

```css
.grid-container {
  display: grid;
  justify-content: center;
}
```

available value for justify content

- **normal**
- **start**
- **end**
- **center**
- **stretch**
- **space-around**
- **space-between**
- **space-evenly**
- **baseline**
- **first baseline**
- **last baseline**

## align-content (tracks) on parent aligning tracks on the block axis

[Align content](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout#aligning_the_grid_tracks_on_the_block_axis)

[Align content tailwindcss](https://tailwindcss.com/docs/align-content)

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  height: 500px;
  width: 500px;
  gap: 10px;
  align-content: end;
}
```

available value for align content

- **normal**
- **start**
- **end**
- **center**
- **stretch**
- **space-around**
- **space-between**
- **space-evenly**
- **baseline**
- **first baseline**
- **last baseline**

## place-content for both justify-content and align-content
[place-content](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content)
[place-content tailwindcss](https://tailwindcss.com/docs/place-content)

# items alignment on parent

## justify-items (items) on parent alignment on the inline axis

[Justify items](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout#justifying_items_on_the_inline_axis)
[Justify content tailwindcss](https://tailwindcss.com/docs/justify-items)

```css
.grid-container {
  display: grid;
  justify-items: center;
}
```

available value for justify content

- **auto**
- **normal**
- **start**
- **end**
- **center**
- **stretch**
- **baseline**
- **first baseline**
- **last baseline**

## align-items (items) on parent aligning tracks on the block axis

[Align items](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout#aligning_items_on_the_block_axis)

[Align items tailwindcss](https://tailwindcss.com/docs/align-items)

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  height: 500px;
  width: 500px;
  gap: 10px;
  align-items: end;
}
```

available value for align items

- **auto**
- **normal**
- **start**
- **end**
- **center**
- **stretch**
- **baseline**
- **first baseline**
- **last baseline**

## place-items for both justify-item and align-items
[place-items](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items)
[place-items tailwindcss](https://tailwindcss.com/docs/place-items)

# Grid lines on children

In the following example I am placing the first two items on our three column track grid, using the grid-column-start, grid-column-end, grid-row-start and grid-row-end properties

_Examples_

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
  <div class="box5">Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}

.box2 {
  grid-column-start: 1;
  grid-row-start: 3;
  grid-row-end: 5;
}
```

Line-positioning shorthands

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box1 {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.box2 {
  grid-column: 1;
  grid-row: 3 / 5;
}
```

# Nesting grids

[Nesting grids](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#nesting_grids)

# Formal syntax for grid-template row and column

---

[mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows#track-size)

---
