package br.ufrj.cos482.service;

import br.ufrj.cos482.service.dto.AlunoDoutoradoDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing AlunoDoutorado.
 */
public interface AlunoDoutoradoService {

    /**
     * Save a alunoDoutorado.
     *
     * @param alunoDoutoradoDTO the entity to save
     * @return the persisted entity
     */
    AlunoDoutoradoDTO save(AlunoDoutoradoDTO alunoDoutoradoDTO);

    /**
     *  Get all the alunoDoutorados.
     *  
     *  @return the list of entities
     */
    List<AlunoDoutoradoDTO> findAll();

    /**
     *  Get the "id" alunoDoutorado.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    AlunoDoutoradoDTO findOne(Long id);

    /**
     *  Delete the "id" alunoDoutorado.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
