<?php

declare(strict_types=1);

namespace App\Model;

use Nette\Database\Explorer;

class TodoRepository
{
    private const TODOS_TABLE_NAME = 'todos';

    /**
     * @var Explorer
     */
    private Explorer $database;

    /**
     * @param Explorer $database
     */
    public function __construct(
        Explorer $database
    )
    {
        $this->database = $database;
    }

    /**
     * @return array
     */
    public function findAll(): array
    {
        return $this->database->table(static::TODOS_TABLE_NAME)
            ->order('created_at DESC')
            ->fetchAll();
    }

    /**
     * @param string $text
     */
    public function create(string $text): void
    {
        $this->database->table(static::TODOS_TABLE_NAME)->insert([
            'text' => $text,
            'done' => 0
        ]);
    }

    /**
     * @param int $id
     * @param bool $done
     */
    public function update(int $id, bool $done): void
    {
        $this->database->table(static::TODOS_TABLE_NAME)->get($id)?->update([
            'done' => $done
        ]);
    }

    /**
     * @param int $id
     */
    public function delete(int $id): void
    {
        $this->database->table(static::TODOS_TABLE_NAME)->get($id)->delete();
    }
}