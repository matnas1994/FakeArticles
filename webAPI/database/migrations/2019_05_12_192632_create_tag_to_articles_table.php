<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagToArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_to_articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('tag_id')->unsigned();
            $table->integer('article_id')->unsigned();
            $table->timestamps();
        });
        Schema::table('tag_to_articles', function (Blueprint $table) {
            $table->foreign('tag_id')->references('id')->on('tags');
        });

        Schema::table('tag_to_articles', function (Blueprint $table) {
            $table->foreign('article_id')->references('id')->on('articles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tag_to_articles');
    }
}
