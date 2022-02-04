//具名匯出
export const pagination = {
    //將資料傳入[內層名稱]
    props: ['pages'],
    //建立元件樣板
    template : `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" 
      :class="{ disabled : !pages.has_pre }">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" 
      v-for="page in pages.total_pages" :key="page + 'page'"
      :class = "{ active : page === pages.current_page}">
      <a class="page-link" href="#" 
      @click="$emit('get-products',page)">{{page}}</a>
      </li>
      <li class="page-item"
      :class="{ disabled : !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
//    data(){},
//    methods:{},
};

