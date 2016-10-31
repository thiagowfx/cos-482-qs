package br.ufrj.cos482.service;

import br.ufrj.cos482.service.dto.AlunoMestradoDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing AlunoMestrado.
 */
public interface AlunoMestradoService {

    /**
     * Save a alunoMestrado.
     *
     * @param alunoMestradoDTO the entity to save
     * @return the persisted entity
     */
    AlunoMestradoDTO save(AlunoMestradoDTO alunoMestradoDTO);

    /**
     *  Get all the alunoMestrados.
     *  
     *  @return the list of entities
     */
    List<AlunoMestradoDTO> findAll();

    /**
     *  Get the "id" alunoMestrado.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    AlunoMestradoDTO findOne(Long id);

    /**
     *  Delete the "id" alunoMestrado.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
