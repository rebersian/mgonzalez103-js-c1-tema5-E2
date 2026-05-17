<template>
  <div class="container py-4">
    <header class="d-flex align-items-center justify-content-between mb-3">
      <h1 class="h4 mb-0">Búsqueda de productos</h1>
    </header>
    <form @submit.prevent="searchBooks">
      <label>Resultados de búsqueda: </label>
      <div class="d-flex gap-2">
        <input v-model="text" class="form-control" placeholder="Introducir una búsqueda" />

        <button class="btn btn-primary" :disabled="!text.trim()">Buscar</button>
      </div>
    </form>
    <div v-if="books && books.length > 0">
      <p>Se han encontrado {{ books.length }} resultados.</p>

      <div class="row">
        <div v-for="book in books" :key="book.key" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100">
            <img
              :src="
                `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` ||
                'https://via.placeholder.com/150x220?text=Sin+imagen'
              "
              class="book-cover"
            />

            <div class="card-body d-flex flex-column">
              <h6 class="card-title">{{ book.title }}</h6>

              <p class="card-text mb-1">
                <strong>Autor:</strong>
                {{ book.author_name?.join(', ') || 'Desconocido' }}
              </p>

              <p class="card-text mb-2">
                <strong>Año:</strong>
                {{ book.first_publish_year || 'N/D' }}
              </p>

              <a
                class="btn btn-sm btn-outline-primary mt-auto"
                :href="`https://openlibrary.org${book.key}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver ficha
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorResponse">
      <p class="text-danger">Se ha producido un error en la búsqueda</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Book } from '@/interfaces/book.interface';
const text = ref('');
const books = ref<Book[]>([]);
const errorResponse = ref<Boolean>(false);

async function searchBooks() {
  if (!text.value) return;

  try {
    // const response = await fetch(`https://openlibrary.org/search.json?q=${text.value}`);
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(text.value.trim())}`
    );
    errorResponse.value = !response.ok;

    if (response.ok) {
      const data = await response.json();

      books.value = data.docs;
    }
  } catch (error) {
    console.error('Error obteniendo libros', error);
  }
}
</script>
<style>
.book-cover {
  width: 150px;
  height: 220px;
  object-fit: cover;
}
</style>
