<template>
  <section>
    <div class="form-container">
      <h1>Add Product</h1>
      <form>
        <div>
          <label>Name</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <button type="submit" class="submit">Add Product</button>
        </div>
      </form>
    </div>
    <div class="list-container">
      <ul>
        <li>
          Shopping List
          <span style="float:right;padding-right:10px;">
            <button>X</button>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style scoped>
input {
  width: 20%;
  height: 30px;
  border: 2px solid green;
}
.submit {
  margin: 10px;
  padding: 10px;
  border-radius: 0px;
  border: 0px;
  background: green;
  color: white;
}
ul li {
  list-style: none;
  border: 2px solid green;
  width: 30%;
  margin-top: 10px;
}
</style>