<template>
  <el-upload
   action="#"
  :show-file-list="false"
  :before-upload="beforeUpload"
  accept=".jpg,.jpeg,.png"
>
    <el-button size="small">
        选择图片
    </el-button>
</el-upload>
</template>

<script setup lang="ts">
import * as imageConversion from 'image-conversion'

const beforeUpload=(file:any)=> {
	console.log('压缩前'+(file.size / 1024)+"K");
	imageConversion.compressAccurately(file, 1024).then(res => {
	    console.log('压缩后'+(res.size / 1024)+"K");
	    console.log(res);
	})
}
</script>